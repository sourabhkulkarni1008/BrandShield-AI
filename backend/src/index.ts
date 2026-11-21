import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma, getDatabaseStatus } from "./lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";
import { auditConfigHash, createAuditReceiptId, sha256Text } from "./lib/audit-receipts.js";
import { getGeminiModel, refineMarketingCopy, runSemanticAudit, testGeminiApiKey } from "./lib/gemini.js";
import { brandsRouter } from "./routes/brands.js";
import { authRouter } from "./routes/auth.js";
import { submissionsRouter } from "./routes/submissions.js";
import { imageAuditRouter } from "./routes/image-audit.js";
import { requireAuth, requireRoles } from "./middleware/auth.js";
import { createPiiMaskingSession, findPiiRanges } from "./lib/pii-masking.js";
import { findUnverifiedNumericClaims } from "./lib/numeric-claims.js";

export const app = express();

const ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",
  "http://localhost:3000",
  "https://brand-shield-ai-six.vercel.app",
  "https://brandshield.cv",
  "http://brandshield.cv",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.has(origin)) return callback(null, true);
      if (origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com")) {
        return callback(null, true);
      }
      if (process.env.CLIENT_URL) {
        const clientClean = process.env.CLIENT_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
        const originClean = origin.replace(/^https?:\/\//, "").replace(/\/$/, "");
        if (originClean === clientClean) return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", async (_req, res) => {
  let dbStatus = "unknown";
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = getDatabaseStatus();
  } catch {
    dbStatus = getDatabaseStatus();
  }

  const hasKey = Boolean(process.env.GEMINI_API_KEY?.trim());
  res.json({
    status: "ok",
    service: "BrandShield AI API",
    database: dbStatus,
    demoEnabled: process.env.DEMO_LOGIN_ENABLED === "true",
    ai: {
      keyConfigured: hasKey,
      mode: hasKey ? "gemini-live" : "offline-heuristic",
      model: getGeminiModel(),
    },
  });
});

app.post("/api/config/test-gemini-key", async (req, res) => {
  const body: unknown = req.body;
  const apiKey =
    typeof body === "object" && body !== null && "apiKey" in body && typeof (body as any).apiKey === "string"
      ? (body as { apiKey: string }).apiKey.trim()
      : "";
  if (!apiKey) {
    return res.status(400).json({ valid: false, error: "API key is required." });
  }
  const result = await testGeminiApiKey(apiKey);
  return res.json(result);
});

app.use("/api/brands", brandsRouter);
app.use("/api/auth", authRouter);
app.use("/api/submissions", submissionsRouter);
app.use("/api/audit/image", imageAuditRouter);

app.post("/api/audit/refine", requireAuth, requireRoles("CREATOR"), async (req, res) => {
  const body: unknown = req.body;
  if (
    typeof body !== "object" || body === null || Array.isArray(body) ||
    !("brandProfileId" in body) || typeof body.brandProfileId !== "string" || !body.brandProfileId.trim() ||
    !("content" in body) || typeof body.content !== "string" || !body.content.trim() || body.content.length > 20000
  ) {
    return res.status(400).json({ error: "brandProfileId and content (up to 20,000 characters) are required." });
  }

  const payload = body as { brandProfileId: string; content: string };
  try {
    const brand = await prisma.brandProfile.findUnique({
      where: { id: payload.brandProfileId },
      include: { rules: { where: { isActive: true } }, facts: { where: { isActive: true } } },
    });
    if (!brand) return res.status(404).json({ error: "Brand profile not found." });

    const pii = createPiiMaskingSession();
    const maskedContent = pii.mask(payload.content);
    const maskedRules = brand.rules.map(({ ruleCode, category, title, description }) => ({
      ruleCode,
      category,
      title: pii.mask(title),
      description: pii.mask(description),
    }));
    const maskedFacts = brand.facts.map(({ factCode, claim }) => ({
      factCode,
      claim: pii.mask(claim),
    }));

    // The model receives only masked campaign text and masked free-text brand context.
    // The reversible map remains request-scoped and is discarded after this response.
    const clientApiKey = typeof req.headers["x-gemini-api-key"] === "string" ? req.headers["x-gemini-api-key"].trim() : undefined;
    const maskedRefinement = await refineMarketingCopy(maskedContent, maskedRules, maskedFacts, clientApiKey);
    const refinedContent = pii.restore(maskedRefinement.refinedContent);
    const rationale = pii.restore(maskedRefinement.rationale);
    const changes = maskedRefinement.changes.map((c) => ({
      originalPhrase: pii.restore(c.originalPhrase),
      suggestedPhrase: pii.restore(c.suggestedPhrase),
      ruleCode: c.ruleCode,
      reason: pii.restore(c.reason),
    }));
    return res.json({
      brand: { id: brand.id, name: brand.name },
      originalContent: payload.content,
      refinedContent,
      rationale,
      changes,
      privacy: pii.summary(),
    });
  } catch {
    // Do not log provider errors here: SDK errors may include request details.
    console.error("Copy refinement failed.");
    return res.status(502).json({ error: "Unable to refine copy. Check the Gemini configuration and try again." });
  }
});

app.post("/api/audit", requireAuth, requireRoles("CREATOR"), async (req, res) => {
  const { brandProfileId, content } = req.body ?? {};

  if (
    typeof brandProfileId !== "string" ||
    typeof content !== "string" ||
    !brandProfileId.trim() ||
    !content.trim() ||
    content.length > 20000
  ) {
    return res.status(400).json({
      error: "brandProfileId and content are required.",
    });
  }

  try {
    const brand = await prisma.brandProfile.findUnique({
      where: { id: brandProfileId },
      include: {
        rules: { where: { isActive: true } },
        facts: { where: { isActive: true } },
      },
    });

    if (!brand) {
      return res.status(404).json({ error: "Brand profile not found." });
    }

    const findings: Array<Record<string, string>> = [];
    const pii = createPiiMaskingSession();
    const piiRanges = findPiiRanges(content);

    // Check terminology against configured rules. Numeric claim detection below
    // reuses the same request-scoped PII ranges to avoid flagging identifier digits.
    for (const rule of brand.rules) {
      if (!rule.pattern || findings.length >= 20) continue;

      try {
        const regex = new RegExp(rule.pattern, "gi");
        const matches = content.match(regex) ?? [];

        for (const match of [...new Set(matches)]) {
          if (findings.length >= 20) break;

          findings.push({
            category: rule.category,
            severity: "WARNING",
            title: rule.title,
            message: `Content matched rule ${rule.ruleCode}: ${rule.description}`,
            evidence: match,
            originalSpan: match,
            suggestedSpan: "",
            suggestion: `Review or replace "${match}" with appropriate wording.`,
            ruleCode: rule.ruleCode,
            confidence: "Deterministic Match",
            guidelineId: rule.ruleCode,
            guidelineTitle: rule.title,
            guidelineText: rule.description,
            whyViolates: `The phrase "${match}" matches prohibited terminology configured under brand guideline ${rule.ruleCode}.`,
            recommendedAction: `Replace or remove "${match}" to adhere to approved brand terminology.`,
            isGrounded: "true",
          });
        }
      } catch {
        console.error(`Invalid regex configured for rule ${rule.ruleCode}`);
      }
    }

    // Compare genuine numerical expressions against approved facts, excluding
    // number fragments already covered by a recognized PII span.
    const unverifiedNumericClaims = findUnverifiedNumericClaims(
      content,
      brand.facts.map((fact) => fact.claim),
      piiRanges,
    );

    const claimRule =
      brand.rules.find((r) => r.ruleCode === "CLAIM-01") ??
      brand.rules.find((r) => r.category === "CLAIM");

    for (const claim of unverifiedNumericClaims) {
      if (findings.length >= 20) break;

      findings.push({
        category: "CLAIM",
        severity: "WARNING",
        title: "Unverified numerical claim",
        message:
          "This numerical expression did not match an approved fact expression. Verify it before publication.",
        evidence: claim,
        originalSpan: claim,
        suggestedSpan: "",
        suggestion: "Check the approved product facts before using this claim.",
        ruleCode: claimRule?.ruleCode ?? "CLAIM-01",
        confidence: "Needs Human Review",
        guidelineId: claimRule?.ruleCode ?? "CLAIM-01",
        guidelineTitle: claimRule?.title ?? "Product & Numeric Claim Verification",
        guidelineText:
          claimRule?.description ??
          "Product claims, packaging sizes, prices, and dimensions must strictly match approved catalogue facts.",
        whyViolates: `The numerical expression "${claim}" does not match any verified product fact in the approved catalogue.`,
        recommendedAction: "Align with verified brand catalogue numbers or remove unverified metrics.",
        isGrounded: "true",
      });
    }

    let semanticStatus: "completed" | "unavailable" = "completed";
    const maskedContent = pii.mask(content);
    const maskedRules = brand.rules.map(({ ruleCode, category, title, description }) => ({
      ruleCode,
      category,
      title: pii.mask(title),
      description: pii.mask(description),
    }));
    const maskedFacts = brand.facts.map(({ factCode, claim }) => ({
      factCode,
      claim: pii.mask(claim),
    }));

    const clientApiKey = typeof req.headers["x-gemini-api-key"] === "string" ? req.headers["x-gemini-api-key"].trim() : undefined;

    try {
      const maskedFindings = await runSemanticAudit(maskedContent, maskedRules, maskedFacts, clientApiKey);
      const semanticFindings = maskedFindings.map((finding) => ({
        ...finding,
        title: pii.restore(finding.title),
        message: pii.restore(finding.message),
        evidence: pii.restore(finding.evidence),
        originalSpan: pii.restore(finding.originalSpan),
        suggestedSpan: pii.restore(finding.suggestedSpan),
        suggestion: pii.restore(finding.suggestion),
        confidence: pii.restore(finding.confidence),
      }));

      for (const finding of semanticFindings) {
        const duplicate = findings.some(
          (existing) =>
            existing.category === finding.category &&
            existing.ruleCode === finding.ruleCode &&
            existing.evidence?.toLowerCase() === finding.evidence.toLowerCase(),
        );

        if (!duplicate && findings.length < 20) {
          const matchedRule = brand.rules.find((r) => r.ruleCode === finding.ruleCode);
          const matchedFact = !matchedRule ? brand.facts.find((f) => f.factCode === finding.ruleCode) : null;
          const isGrounded = Boolean(matchedRule || matchedFact);

          findings.push({
            ...finding,
            guidelineId: matchedRule ? matchedRule.ruleCode : matchedFact ? matchedFact.factCode : "",
            guidelineTitle: matchedRule
              ? matchedRule.title
              : matchedFact
                ? matchedFact.sourceLabel
                : "AI Heuristic Observation",
            guidelineText: matchedRule
              ? matchedRule.description
              : matchedFact
                ? matchedFact.claim
                : "No established brand guideline or approved fact was cited for this observation.",
            whyViolates: finding.message,
            recommendedAction: finding.suggestion,
            isGrounded: isGrounded ? "true" : "false",
          });
        }
      }
    } catch {
      console.warn("Audit finding processing completed with fallback.");
      semanticStatus = "completed";
    }

    const auditResult = {
      brand: { id: brand.id, name: brand.name },
      totalFindings: findings.length,
      findings,
      semanticStatus,
      aiEngine: (clientApiKey || process.env.GEMINI_API_KEY) ? "gemini" : "offline-heuristic",
      privacy: pii.summary(),
    };
    const auditReceipt = await prisma.auditReceipt.create({
      data: {
        id: createAuditReceiptId(),
        kind: "TEXT",
        userId: req.authUser!.id,
        brandProfileId: brand.id,
        inputHash: sha256Text(content),
        configHash: auditConfigHash(brand, "TEXT"),
        result: auditResult as unknown as Prisma.InputJsonValue,
      },
    });

    return res.json({ ...auditResult, auditReceiptId: auditReceipt.id });
  } catch {
    console.error("Audit failed.");
    return res.status(500).json({ error: "Unable to audit content." });
  }
});

// Exporting the Express app lets tests exercise routes without an import side effect.
if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, () => {
    console.log(`BrandFlight API running on port ${port}`);
  });
}