import test from "node:test";
import assert from "node:assert/strict";
import { validateReviewDecision } from "../src/lib/review-validation.js";

test("review decision validation allows REJECTED with valid reason of 10+ characters", () => {
  const result = validateReviewDecision("REJECTED", "Content fundamentally violates our brand safety guidelines.");
  assert.equal(result.valid, true);
  if (result.valid) {
    assert.equal(result.status, "REJECTED");
    assert.equal(result.note, "Content fundamentally violates our brand safety guidelines.");
  }
});

test("review decision validation rejects REJECTED without a reason or with short reason", () => {
  const noReason = validateReviewDecision("REJECTED", undefined);
  assert.equal(noReason.valid, false);
  if (!noReason.valid) {
    assert.match(noReason.error, /reason of at least 10 characters is required/i);
  }

  const shortReason = validateReviewDecision("REJECTED", "Too short");
  assert.equal(shortReason.valid, false);
  if (!shortReason.valid) {
    assert.match(shortReason.error, /reason of at least 10 characters is required/i);
  }
});

test("review decision validation rejects unauthorized statuses", () => {
  const invalid = validateReviewDecision("AUTO_APPROVED", "AI decided this is fine");
  assert.equal(invalid.valid, false);
  if (!invalid.valid) {
    assert.match(invalid.error, /Status must be APPROVED, CHANGES_REQUESTED, or REJECTED/);
  }
});

test("review decision validation preserves APPROVED and CHANGES_REQUESTED contracts", () => {
  const approved = validateReviewDecision("APPROVED", undefined);
  assert.equal(approved.valid, true);
  if (approved.valid) {
    assert.equal(approved.status, "APPROVED");
  }

  const changes = validateReviewDecision("CHANGES_REQUESTED", "Please update the bottle pricing to MRP ₹20.");
  assert.equal(changes.valid, true);
  if (changes.valid) {
    assert.equal(changes.status, "CHANGES_REQUESTED");
    assert.equal(changes.note, "Please update the bottle pricing to MRP ₹20.");
  }
});
