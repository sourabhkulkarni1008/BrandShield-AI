import "dotenv/config";
import { hash } from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function seedDemoUsers() {
  const demoUsers = [
    {
      name: "Demo Creator",
      email: "creator@brandflight.demo",
      role: "CREATOR" as const,
      password: process.env.DEMO_CREATOR_PASSWORD || "BrandShield2026!Creator",
    },
    {
      name: "Demo Manager",
      email: "manager@brandflight.demo",
      role: "MANAGER" as const,
      password: process.env.DEMO_MANAGER_PASSWORD || "BrandShield2026!Manager",
    },
    {
      name: "Demo Reviewer",
      email: "reviewer@brandflight.demo",
      role: "REVIEWER" as const,
      password: process.env.DEMO_REVIEWER_PASSWORD || "BrandShield2026!Reviewer",
    },
  ];

  for (const demoUser of demoUsers) {
    const rawPassword =
      demoUser.password && demoUser.password.length >= 16
        ? demoUser.password
        : `BrandShield2026!${demoUser.role}`;

    const passwordHash = await hash(rawPassword, 12);

    await prisma.user.upsert({
      where: { email: demoUser.email },
      update: {
        name: demoUser.name,
        role: demoUser.role,
      },
      create: {
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
        passwordHash,
      },
    });
  }

  console.log("Demo creator, manager, and reviewer accounts are ready.");
}

async function main() {
  await seedDemoUsers();

  const creator = await prisma.user.findUnique({ where: { email: "creator@brandflight.demo" } });
  const reviewer = await prisma.user.findUnique({ where: { email: "reviewer@brandflight.demo" } });
  const manager = await prisma.user.findUnique({ where: { email: "manager@brandflight.demo" } });

  if (!creator || !reviewer || !manager) {
    throw new Error("Demo users could not be located after seeding.");
  }

  // 1. Seed Campa Cola Brand Profile
  const brand = await prisma.brandProfile.upsert({
    where: { id: "brandflight-demo" },
    update: {
      name: "Campa Cola",
      description:
        "Iconic Indian carbonated beverage brand by Reliance Consumer Products Ltd, offering classic cola, lemon, and orange refreshments celebrated across India as The Great Indian Taste.",
      brandColors: ["#C41230", "#0B1E3D", "#FFFFFF", "#00A3E0", "#F59E0B", "#1E293B"],
      accessibilityPairs: [
        { role: "BODY_TEXT", foreground: "#0B1E3D", background: "#FFFFFF" },
        { role: "HEADING", foreground: "#C41230", background: "#FFFFFF" },
        { role: "CTA_TEXT", foreground: "#FFFFFF", background: "#C41230" },
        { role: "CAPTION", foreground: "#475569", background: "#FFFFFF" },
        { role: "UI_ELEMENT", foreground: "#0B1E3D", background: "#F8FAFC" },
      ],
    },
    create: {
      id: "brandflight-demo",
      name: "Campa Cola",
      description:
        "Iconic Indian carbonated beverage brand by Reliance Consumer Products Ltd, offering classic cola, lemon, and orange refreshments celebrated across India as The Great Indian Taste.",
      brandColors: ["#C41230", "#0B1E3D", "#FFFFFF", "#00A3E0", "#F59E0B", "#1E293B"],
      accessibilityPairs: [
        { role: "BODY_TEXT", foreground: "#0B1E3D", background: "#FFFFFF" },
        { role: "HEADING", foreground: "#C41230", background: "#FFFFFF" },
        { role: "CTA_TEXT", foreground: "#FFFFFF", background: "#C41230" },
        { role: "CAPTION", foreground: "#475569", background: "#FFFFFF" },
        { role: "UI_ELEMENT", foreground: "#0B1E3D", background: "#F8FAFC" },
      ],
    },
  });

  // 2. Seed Campa Cola Governance Rules
  const rules = [
    {
      ruleCode: "TONE-01",
      category: "TONE" as const,
      title: "Use celebratory, energetic Indian refreshment voice",
      description:
        "Write in an energetic, festive, and welcoming tone celebrating togetherness, authentic Indian refreshment, and heritage. Keep product claims grounded in the approved catalogue.",
    },
    {
      ruleCode: "TERM-01",
      category: "TERMINOLOGY" as const,
      title: "Prohibit unsupported superlatives and unverified health claims",
      description:
        "Flag exaggerated superlatives and unverified health claims such as best, finest, perfect, unmatched, zero calories, sugar-free, 100% natural, or cures fatigue.",
      pattern: "\\b(best|finest|perfect|guarantee(?:s|d|ing)?|unmatched|number one|no\\.?\\s*1|zero calories|sugar-free|100% natural|cure(?:s|d)?)\\b",
    },
    {
      ruleCode: "CLAIM-01",
      category: "CLAIM" as const,
      title: "Match bottle sizes, MRPs, and nutrition to approved catalogue",
      description:
        "Product names, packaging volumes (200ml, 500ml, 2L), MRPs (₹10, ₹20, ₹70), serving temperatures (4°C to 8°C), and return policies must strictly match approved Campa Cola facts. Do not invent discounts or unapproved pricing.",
    },
    {
      ruleCode: "VISUAL-01",
      category: "VISUAL" as const,
      title: "Preserve the Campa Cola visual identity",
      description:
        "Use the approved Campa Red (#C41230), Navy (#0B1E3D), and white palette. Use white text on Campa Red CTAs; do not place small red text on dark backgrounds.",
    },
    {
      ruleCode: "ACCESSIBILITY-01",
      category: "ACCESSIBILITY" as const,
      title: "Provide accurate product-image alt text",
      description:
        "Provide meaningful alt text between 10 and 150 characters describing packaging, bottle silhouettes, and beverage variants without guessing unverified claims.",
    },
    {
      ruleCode: "ACCESSIBILITY-02",
      category: "ACCESSIBILITY" as const,
      title: "Maintain readable text contrast in campaign artwork",
      description:
        "Use configured WCAG 2.1 contrast role pairs: at least 4.5:1 for regular text and 3:1 for large headings or non-text UI elements.",
    },
  ];

  for (const rule of rules) {
    await prisma.brandRule.upsert({
      where: {
        brandProfileId_ruleCode: {
          brandProfileId: brand.id,
          ruleCode: rule.ruleCode,
        },
      },
      update: rule,
      create: { ...rule, brandProfileId: brand.id },
    });
  }

  // 3. Seed Campa Cola Approved Factual Truth
  const facts = [
    {
      factCode: "FACT-01",
      claim: "Campa Cola 500ml PET bottle is priced at MRP ₹20, bottled by Reliance Consumer Products Ltd.",
    },
    {
      factCode: "FACT-02",
      claim: "Campa Cola 200ml returnable glass bottle is priced at MRP ₹10 with 21g carbohydrate content per serving.",
    },
    {
      factCode: "FACT-03",
      claim: "Campa Cola 2-Litre family celebration pack is priced at MRP ₹70.",
    },
    {
      factCode: "FACT-04",
      claim: "Campa Orange is a sparkling citrus flavored beverage formulated with permitted natural color (110) and added orange fruit flavor.",
    },
    {
      factCode: "FACT-05",
      claim: "Campa Lemon is a crisp carbonated lemon-lime soft drink with sparkling carbonation.",
    },
    {
      factCode: "FACT-06",
      claim: "Campa Cola products should be stored in a cool, dry place and are best served chilled between 4°C and 8°C.",
    },
    {
      factCode: "FACT-07",
      claim: "Damaged, leaked, or unsealed bottles can be replaced at the retail point of purchase within 24 hours with valid invoice and batch code.",
    },
  ];

  for (const fact of facts) {
    await prisma.approvedFact.upsert({
      where: {
        brandProfileId_factCode: {
          brandProfileId: brand.id,
          factCode: fact.factCode,
        },
      },
      update: {
        ...fact,
        sourceLabel: "Campa Cola official product catalogue and retail policies",
      },
      create: {
        ...fact,
        sourceLabel: "Campa Cola official product catalogue and retail policies",
        brandProfileId: brand.id,
      },
    });
  }

  // 4. Seed Preloaded Campa Cola Campaigns for Reviewer & Manager Dashboards
  // Submission 1: IN_REVIEW (ready for Demo Reviewer to inspect and act upon)
  const sub1 = await prisma.submission.upsert({
    where: { id: "campa-sub-01" },
    update: {
      title: "Campa Cola — Summer Refreshment Blast",
      contentText:
        "The BEST cola in India! Our Campa Cola 500ml bottle has ZERO calories and guarantees maximum energy for every celebration. Now only ₹5 at your nearest store.",
      tags: ["Summer2026", "SocialMedia", "Campaign"],
      status: "IN_REVIEW",
      brandProfileId: brand.id,
      creatorId: creator.id,
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Chilled 500ml bottle of Campa Cola on ice with classic red wave branding and Great Indian Taste tagline",
    },
    create: {
      id: "campa-sub-01",
      title: "Campa Cola — Summer Refreshment Blast",
      contentText:
        "The BEST cola in India! Our Campa Cola 500ml bottle has ZERO calories and guarantees maximum energy for every celebration. Now only ₹5 at your nearest store.",
      tags: ["Summer2026", "SocialMedia", "Campaign"],
      status: "IN_REVIEW",
      brandProfileId: brand.id,
      creatorId: creator.id,
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Chilled 500ml bottle of Campa Cola on ice with classic red wave branding and Great Indian Taste tagline",
    },
  });

  // Attach findings to Submission 1
  await prisma.finding.deleteMany({ where: { submissionId: sub1.id } });
  await prisma.finding.createMany({
    data: [
      {
        submissionId: sub1.id,
        category: "TERMINOLOGY",
        severity: "WARNING",
        title: "Avoid unsupported superlatives",
        message: "Content matched rule TERM-01: Prohibit unsupported superlatives and unverified health claims",
        evidence: "BEST",
        originalSpan: "BEST",
        suggestion: "Replace 'BEST' with 'authentic' or 'beloved'.",
        ruleCode: "TERM-01",
        confidence: "Deterministic Match",
      },
      {
        submissionId: sub1.id,
        category: "CLAIM",
        severity: "ERROR",
        title: "Price & nutritional claim mismatch",
        message: "Campa Cola 500ml is approved at MRP ₹20 (not ₹5). Standard formula contains 21g carbohydrates (not zero calories).",
        evidence: "ZERO calories ... ₹5",
        originalSpan: "ZERO calories",
        suggestion: "Use approved catalogue values: MRP ₹20, contains 21g carbohydrates.",
        ruleCode: "CLAIM-01",
        confidence: "Needs Human Review",
      },
    ],
  });

  // Submission 2: CHANGES_REQUESTED (demonstrates feedback loop)
  const sub2 = await prisma.submission.upsert({
    where: { id: "campa-sub-02" },
    update: {
      title: "Campa Orange — Desi Tang Celebration",
      contentText:
        "Experience 100% natural fruit juice in every chilled bottle of Campa Orange for just ₹15. Refreshing citrus burst in every sip.",
      tags: ["Citrus", "Orange", "OutdoorPrint"],
      status: "CHANGES_REQUESTED",
      brandProfileId: brand.id,
      creatorId: creator.id,
      reviewerId: reviewer.id,
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Campa Orange sparkling beverage bottle in sunlit summer background",
    },
    create: {
      id: "campa-sub-02",
      title: "Campa Orange — Desi Tang Celebration",
      contentText:
        "Experience 100% natural fruit juice in every chilled bottle of Campa Orange for just ₹15. Refreshing citrus burst in every sip.",
      tags: ["Citrus", "Orange", "OutdoorPrint"],
      status: "CHANGES_REQUESTED",
      brandProfileId: brand.id,
      creatorId: creator.id,
      reviewerId: reviewer.id,
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Campa Orange sparkling beverage bottle in sunlit summer background",
    },
  });

  // Reviewer comment on Submission 2
  await prisma.comment.deleteMany({ where: { submissionId: sub2.id } });
  await prisma.comment.create({
    data: {
      submissionId: sub2.id,
      authorId: reviewer.id,
      body: "Please update the claim: Campa Orange is formulated with permitted natural color and added fruit flavor, not 100% natural fruit juice. Also update pricing to approved MRP ₹20 for 500ml.",
    },
  });

  // Submission 3: APPROVED (demonstrates cryptographic Release Passport)
  const sub3 = await prisma.submission.upsert({
    where: { id: "campa-sub-03" },
    update: {
      title: "Campa Cola — The Great Indian Taste (National Launch)",
      contentText:
        "Refresh your celebrations with the classic taste of Campa Cola, bottled by Reliance Consumer Products Ltd. Best served chilled between 4°C and 8°C. 500ml bottle at MRP ₹20.",
      tags: ["NationalLaunch", "Heritage", "Approved"],
      status: "APPROVED",
      brandProfileId: brand.id,
      creatorId: creator.id,
      reviewerId: reviewer.id,
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Official Campa Cola 500ml bottle banner with verified high-contrast typography and authentic wave mark",
    },
    create: {
      id: "campa-sub-03",
      title: "Campa Cola — The Great Indian Taste (National Launch)",
      contentText:
        "Refresh your celebrations with the classic taste of Campa Cola, bottled by Reliance Consumer Products Ltd. Best served chilled between 4°C and 8°C. 500ml bottle at MRP ₹20.",
      tags: ["NationalLaunch", "Heritage", "Approved"],
      status: "APPROVED",
      brandProfileId: brand.id,
      creatorId: creator.id,
      reviewerId: reviewer.id,
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Official Campa Cola 500ml bottle banner with verified high-contrast typography and authentic wave mark",
    },
  });

  // Release Passport for Submission 3
  await prisma.releasePassport.upsert({
    where: { submissionId: sub3.id },
    update: {
      passportHash: "campa-national-launch-passport-cert-2026-sha256",
      snapshot: {
        submissionId: sub3.id,
        title: sub3.title,
        contentText: sub3.contentText,
        brandProfileId: brand.id,
        brandName: "Campa Cola",
        reviewerId: reviewer.id,
        reviewerEmail: reviewer.email,
        approvedAt: new Date().toISOString(),
        certification: "WCAG 2.2 AA Verified · Truth-Engine Certified · Zero Violations",
      },
    },
    create: {
      submissionId: sub3.id,
      passportHash: "campa-national-launch-passport-cert-2026-sha256",
      snapshot: {
        submissionId: sub3.id,
        title: sub3.title,
        contentText: sub3.contentText,
        brandProfileId: brand.id,
        brandName: "Campa Cola",
        reviewerId: reviewer.id,
        reviewerEmail: reviewer.email,
        approvedAt: new Date().toISOString(),
        certification: "WCAG 2.2 AA Verified · Truth-Engine Certified · Zero Violations",
      },
    },
  });

  console.log("Campa Cola demo brand, rules, facts, and preloaded campaigns seeded successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
