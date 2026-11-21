import test from "node:test";
import assert from "node:assert/strict";
import { prisma, isDatabaseFallbackActive, getDatabaseStatus } from "../src/lib/prisma.js";

test("prisma proxy transparently returns seeded Campa Cola brand profile when database is in fallback", async () => {
  const brand = await prisma.brandProfile.findUnique({
    where: { id: "brandflight-demo" },
    include: {
      rules: { where: { isActive: true } },
      facts: { where: { isActive: true } },
      assets: true,
    },
  });

  assert.ok(brand);
  assert.equal(brand.id, "brandflight-demo");
  assert.equal(brand.name, "Campa Cola");
  assert.ok(Array.isArray(brand.rules));
  assert.ok(brand.rules.length >= 6);
  assert.ok(Array.isArray(brand.facts));
  assert.ok(brand.facts.length >= 7);
});

test("prisma proxy supports auditReceipt creation and retrieval in fallback mode", async () => {
  const receipt = await prisma.auditReceipt.create({
    data: {
      id: "rcpt-test-fallback-01",
      kind: "TEXT",
      userId: "usr_demo_creator",
      brandProfileId: "brandflight-demo",
      inputHash: "a".repeat(64),
      configHash: "b".repeat(64),
      result: { totalFindings: 0, findings: [] },
    },
  });

  assert.ok(receipt);
  assert.equal(receipt.id, "rcpt-test-fallback-01");

  const fetched = await prisma.auditReceipt.findUnique({
    where: { id: "rcpt-test-fallback-01" },
  });
  assert.ok(fetched);
  assert.equal(fetched.id, "rcpt-test-fallback-01");
});

test("prisma proxy supports user lookup and submissions in fallback mode", async () => {
  const user = await prisma.user.findUnique({
    where: { email: "creator@brandflight.demo" },
  });
  assert.ok(user);
  assert.equal(user.role, "CREATOR");

  const submissions = await prisma.submission.findMany({
    where: { brandProfileId: "brandflight-demo" },
  });
  assert.ok(Array.isArray(submissions));
  assert.ok(submissions.length >= 3);
});
