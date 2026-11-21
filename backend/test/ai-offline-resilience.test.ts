import test from "node:test";
import assert from "node:assert/strict";
import {
  getGeminiModel,
  runSemanticAuditHeuristic,
  refineMarketingCopyHeuristic,
  testGeminiApiKey,
} from "../src/lib/gemini.js";

test("getGeminiModel defaults to gemini-2.5-flash and replaces deprecated 3.5 placeholder", () => {
  const model = getGeminiModel();
  assert.equal(model, "gemini-2.5-flash");
});

test("testGeminiApiKey returns descriptive validation error when key is invalid", async () => {
  const result = await testGeminiApiKey("invalid_fake_key_12345");
  assert.equal(result.valid, false);
  assert.equal(result.model, "gemini-2.5-flash");
  assert.ok(result.error);
});

test("runSemanticAuditHeuristic detects ungrounded superlatives and produces compliant findings", () => {
  const rules = [
    {
      ruleCode: "TONE-01",
      category: "TONE",
      title: "Celebratory Indian refreshment voice",
      description: "Write in an energetic, festive, and welcoming tone. Avoid unsupported superlatives.",
    },
    {
      ruleCode: "CLAIM-01",
      category: "CLAIM",
      title: "Grounded catalogue claims",
      description: "Match prices and specs to approved facts.",
    },
  ];
  const facts = [
    {
      factCode: "FACT-01",
      claim: "Campa Cola 500ml PET bottle is priced at MRP ₹20.",
    },
  ];

  const content = "The BEST cola in India! Zero calories and revolutionary refreshment. Buy now before it's gone!";
  const findings = runSemanticAuditHeuristic(content, rules, facts);

  assert.ok(findings.length >= 2);
  assert.ok(findings.some((f) => f.evidence.toLowerCase().includes("best")));
  assert.ok(findings.some((f) => f.evidence.toLowerCase().includes("zero calories") || f.evidence.toLowerCase().includes("buy now before")));
  for (const finding of findings) {
    assert.equal(finding.category, "TONE");
    assert.equal(finding.severity, "WARNING");
    assert.ok(finding.originalSpan);
    assert.ok(finding.suggestedSpan);
  }
});

test("refineMarketingCopyHeuristic refines copy without throwing and provides structured diffs", () => {
  const rules = [
    {
      ruleCode: "TERM-01",
      category: "TERMINOLOGY",
      title: "No unverified superlatives",
      description: "Avoid unsupported superlatives like best.",
    },
    {
      ruleCode: "CLAIM-01",
      category: "CLAIM",
      title: "Verified catalogue claims",
      description: "Pricing must match MRP ₹20.",
    },
  ];
  const facts = [
    {
      factCode: "FACT-01",
      claim: "Campa Cola 500ml PET bottle is priced at MRP ₹20.",
    },
  ];

  const content = "The BEST cola in India! Now only ₹5 at your nearest store.";
  const result = refineMarketingCopyHeuristic(content, rules, facts);

  assert.ok(result.refinedContent);
  assert.ok(!result.refinedContent.includes("BEST"));
  assert.ok(!result.refinedContent.includes("₹5"));
  assert.ok(result.changes.length >= 2);
  assert.ok(result.rationale.length > 10);
});
