import test from "node:test";
import assert from "node:assert/strict";

interface AuditFindingWithEvidence {
  category: string;
  severity: string;
  title: string;
  message: string;
  evidence: string;
  ruleCode?: string;
  guidelineId?: string;
  guidelineTitle?: string;
  guidelineText?: string;
  whyViolates?: string;
  recommendedAction?: string;
  isGrounded?: string;
}

test("evidence-based violations enforce guideline traceability and original guideline text", () => {
  const brandRules = [
    {
      ruleCode: "TERM-01",
      category: "TERMINOLOGY",
      title: "Prohibit unsupported superlatives and unverified health claims",
      description: "Flag exaggerated superlatives such as best, finest, perfect, unmatched, zero calories.",
    },
  ];

  const match = "best";
  const rule = brandRules[0];

  const finding: AuditFindingWithEvidence = {
    category: rule.category,
    severity: "WARNING",
    title: rule.title,
    message: `Content matched rule ${rule.ruleCode}: ${rule.description}`,
    evidence: match,
    ruleCode: rule.ruleCode,
    guidelineId: rule.ruleCode,
    guidelineTitle: rule.title,
    guidelineText: rule.description,
    whyViolates: `The phrase "${match}" matches prohibited terminology configured under brand guideline ${rule.ruleCode}.`,
    recommendedAction: `Replace or remove "${match}" to adhere to approved brand terminology.`,
    isGrounded: "true",
  };

  assert.equal(finding.guidelineId, "TERM-01");
  assert.equal(finding.guidelineTitle, "Prohibit unsupported superlatives and unverified health claims");
  assert.match(finding.guidelineText ?? "", /Flag exaggerated superlatives/);
  assert.equal(finding.isGrounded, "true");
  assert.match(finding.whyViolates ?? "", /matches prohibited terminology/);
  assert.match(finding.recommendedAction ?? "", /Replace or remove/);
});

test("evidence-based violations clearly flag ungrounded AI observations", () => {
  const observation: AuditFindingWithEvidence = {
    category: "TONE",
    severity: "INFO",
    title: "Informal phrasing observed",
    message: "Consider a more formal style for enterprise audiences.",
    evidence: "hey guys",
    guidelineId: "",
    guidelineTitle: "AI Heuristic Observation",
    guidelineText: "No established brand guideline or approved fact was cited for this observation.",
    whyViolates: "Consider a more formal style for enterprise audiences.",
    recommendedAction: "Review tone for context.",
    isGrounded: "false",
  };

  assert.equal(observation.isGrounded, "false");
  assert.equal(observation.guidelineTitle, "AI Heuristic Observation");
  assert.equal(observation.guidelineId, "");
});
