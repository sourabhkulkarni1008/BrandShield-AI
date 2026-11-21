import test from "node:test";
import assert from "node:assert/strict";
import type { RefinedCopyResult } from "../src/lib/gemini.js";

test("smarter AI corrections provide structured rationale and granular diffs", () => {
  const result: RefinedCopyResult = {
    originalContent: "The BEST cola in India! Our Campa Cola 500ml bottle has ZERO calories and guarantees maximum energy for every celebration. Now only ₹5 at your nearest store.",
    refinedContent: "Celebrate with Campa Cola, The Great Indian Taste! Enjoy our 500ml PET bottle chilled between 4°C and 8°C. Available at MRP ₹20 at your nearest store.",
    rationale: "Removed unsupported superlative 'BEST', corrected unverified 'ZERO calories' and 'guarantees maximum energy' claims, and aligned bottle price with approved catalogue fact (MRP ₹20).",
    changes: [
      {
        originalPhrase: "The BEST cola in India!",
        suggestedPhrase: "Celebrate with Campa Cola, The Great Indian Taste!",
        ruleCode: "TERM-01",
        reason: "Removed unverified superlative 'BEST' and used approved brand slogan.",
      },
      {
        originalPhrase: "has ZERO calories and guarantees maximum energy",
        suggestedPhrase: "Enjoy our 500ml PET bottle chilled between 4°C and 8°C",
        ruleCode: "CLAIM-01",
        reason: "Substituted unverified nutrition and energy guarantees with approved serving temperature guidance.",
      },
      {
        originalPhrase: "Now only ₹5",
        suggestedPhrase: "Available at MRP ₹20",
        ruleCode: "CLAIM-01",
        reason: "Corrected unapproved pricing to match official 500ml MRP ₹20 fact.",
      },
    ],
  } as RefinedCopyResult & { originalContent: string };

  assert.equal(typeof result.refinedContent, "string");
  assert.equal(typeof result.rationale, "string");
  assert.equal(Array.isArray(result.changes), true);
  assert.equal(result.changes.length, 3);
  assert.equal(result.changes[0].ruleCode, "TERM-01");
  assert.equal(result.changes[1].ruleCode, "CLAIM-01");
  assert.equal(result.changes[2].ruleCode, "CLAIM-01");
});
