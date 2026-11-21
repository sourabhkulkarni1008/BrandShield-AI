import { hashSync } from "bcryptjs";

export interface FallbackBrandProfile {
  id: string;
  name: string;
  description: string;
  brandColors: string[];
  accessibilityPairs: any;
  rules: any[];
  facts: any[];
  assets: any[];
  createdAt: Date;
  updatedAt: Date;
}

const CAMPA_RULES = [
  {
    id: "rule-campa-01",
    brandProfileId: "brandflight-demo",
    ruleCode: "TONE-01",
    category: "TONE",
    title: "Use celebratory, energetic Indian refreshment voice",
    description:
      "Write in an energetic, festive, and welcoming tone celebrating togetherness, authentic Indian refreshment, and heritage. Keep product claims grounded in the approved catalogue.",
    pattern: null,
    isActive: true,
  },
  {
    id: "rule-campa-02",
    brandProfileId: "brandflight-demo",
    ruleCode: "TERM-01",
    category: "TERMINOLOGY",
    title: "Prohibit unsupported superlatives and unverified health claims",
    description:
      "Flag exaggerated superlatives and unverified health claims such as best, finest, perfect, unmatched, zero calories, sugar-free, 100% natural, or cures fatigue.",
    pattern: "\\b(best|finest|perfect|guarantee(?:s|d|ing)?|unmatched|number one|no\\.?\\s*1|zero calories|sugar-free|100% natural|cure(?:s|d)?)\\b",
    isActive: true,
  },
  {
    id: "rule-campa-03",
    brandProfileId: "brandflight-demo",
    ruleCode: "CLAIM-01",
    category: "CLAIM",
    title: "Match bottle sizes, MRPs, and nutrition to approved catalogue",
    description:
      "Product names, packaging volumes (200ml, 500ml, 2L), MRPs (₹10, ₹20, ₹70), serving temperatures (4°C to 8°C), and return policies must strictly match approved Campa Cola facts. Do not invent discounts or unapproved pricing.",
    pattern: null,
    isActive: true,
  },
  {
    id: "rule-campa-04",
    brandProfileId: "brandflight-demo",
    ruleCode: "VISUAL-01",
    category: "VISUAL",
    title: "Preserve the Campa Cola visual identity",
    description:
      "Use the approved Campa Red (#C41230), Navy (#0B1E3D), and white palette. Use white text on Campa Red CTAs; do not place small red text on dark backgrounds.",
    pattern: null,
    isActive: true,
  },
  {
    id: "rule-campa-05",
    brandProfileId: "brandflight-demo",
    ruleCode: "ACCESSIBILITY-01",
    category: "ACCESSIBILITY",
    title: "Provide accurate product-image alt text",
    description:
      "Provide meaningful alt text between 10 and 150 characters describing packaging, bottle silhouettes, and beverage variants without guessing unverified claims.",
    pattern: null,
    isActive: true,
  },
  {
    id: "rule-campa-06",
    brandProfileId: "brandflight-demo",
    ruleCode: "ACCESSIBILITY-02",
    category: "ACCESSIBILITY",
    title: "Maintain readable text contrast in campaign artwork",
    description:
      "Use configured WCAG 2.1 contrast role pairs: at least 4.5:1 for regular text and 3:1 for large headings or non-text UI elements.",
    pattern: null,
    isActive: true,
  },
];

const CAMPA_FACTS = [
  {
    id: "fact-campa-01",
    brandProfileId: "brandflight-demo",
    factCode: "FACT-01",
    claim: "Campa Cola 500ml PET bottle is priced at MRP ₹20, bottled by Reliance Consumer Products Ltd.",
    sourceLabel: "Campa Cola official product catalogue and retail policies",
    isActive: true,
  },
  {
    id: "fact-campa-02",
    brandProfileId: "brandflight-demo",
    factCode: "FACT-02",
    claim: "Campa Cola 200ml returnable glass bottle is priced at MRP ₹10 with 21g carbohydrate content per serving.",
    sourceLabel: "Campa Cola official product catalogue and retail policies",
    isActive: true,
  },
  {
    id: "fact-campa-03",
    brandProfileId: "brandflight-demo",
    factCode: "FACT-03",
    claim: "Campa Cola 2-Litre family celebration pack is priced at MRP ₹70.",
    sourceLabel: "Campa Cola official product catalogue and retail policies",
    isActive: true,
  },
  {
    id: "fact-campa-04",
    brandProfileId: "brandflight-demo",
    factCode: "FACT-04",
    claim: "Campa Orange is a sparkling citrus flavored beverage formulated with permitted natural color (110) and added orange fruit flavor.",
    sourceLabel: "Campa Cola official product catalogue and retail policies",
    isActive: true,
  },
  {
    id: "fact-campa-05",
    brandProfileId: "brandflight-demo",
    factCode: "FACT-05",
    claim: "Campa Lemon is a crisp carbonated lemon-lime soft drink with sparkling carbonation.",
    sourceLabel: "Campa Cola official product catalogue and retail policies",
    isActive: true,
  },
  {
    id: "fact-campa-06",
    brandProfileId: "brandflight-demo",
    factCode: "FACT-06",
    claim: "Campa Cola products should be stored in a cool, dry place and are best served chilled between 4°C and 8°C.",
    sourceLabel: "Campa Cola official product catalogue and retail policies",
    isActive: true,
  },
  {
    id: "fact-campa-07",
    brandProfileId: "brandflight-demo",
    factCode: "FACT-07",
    claim: "Damaged, leaked, or unsealed bottles can be replaced at the retail point of purchase within 24 hours with valid invoice and batch code.",
    sourceLabel: "Campa Cola official product catalogue and retail policies",
    isActive: true,
  },
];

const CAMPA_ASSETS = [
  {
    id: "asset-campa-01",
    brandProfileId: "brandflight-demo",
    assetType: "PRIMARY_LOGO",
    name: "Campa Cola Primary Logo",
    format: "png",
    secureUrl: "https://res.cloudinary.com/demo/image/upload/campacola-campaign.png",
    publicId: "campacola-campaign",
    expectedWordmark: "Campa Cola",
    description: "Official Campa Cola red wave mark and wordmark",
    isRequired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const inMemoryBrand: FallbackBrandProfile = {
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
  rules: CAMPA_RULES,
  facts: CAMPA_FACTS,
  assets: CAMPA_ASSETS,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const inMemoryUsers: any[] = [
  {
    id: "usr_demo_creator",
    name: "Demo Creator",
    email: "creator@brandflight.demo",
    role: "CREATOR",
    passwordHash: hashSync("BrandShield2026!Creator", 10),
    createdAt: new Date(),
  },
  {
    id: "usr_demo_reviewer",
    name: "Demo Reviewer",
    email: "reviewer@brandflight.demo",
    role: "REVIEWER",
    passwordHash: hashSync("BrandShield2026!Reviewer", 10),
    createdAt: new Date(),
  },
  {
    id: "usr_demo_manager",
    name: "Demo Manager",
    email: "manager@brandflight.demo",
    role: "MANAGER",
    passwordHash: hashSync("BrandShield2026!Manager", 10),
    createdAt: new Date(),
  },
];

export const inMemoryReceipts = new Map<string, any>();

const DEFAULT_FINDINGS = [
  {
    id: "f-campa-01",
    category: "TONE",
    severity: "WARNING",
    title: "Unverified superlative claim",
    message: "The term 'BEST' is an unverified superlative claim contrary to brand guidelines.",
    evidence: "BEST cola",
    suggestion: "Use approved brand slogan 'The Great Indian Taste'.",
    ruleCode: "TONE-01",
    confidence: "Deterministic Match",
    isResolved: false,
    guidelineId: "TONE-01",
    guidelineTitle: "Campa Cola Tone & Voice Guidelines",
    guidelineText: "Maintain an energetic, proud Indian celebration tone. Avoid absolute superlatives like 'number one' or 'best' unless certified.",
    whyViolates: "Uses superlative 'BEST' without third-party comparative audit verification.",
    recommendedAction: "Replace 'BEST' with 'authentic' or 'heritage'.",
    isGrounded: true,
  },
  {
    id: "f-campa-02",
    category: "CLAIM",
    severity: "ERROR",
    title: "Unapproved zero calorie claim",
    message: "Zero calorie claims are unverified for standard Campa Cola 500ml.",
    evidence: "ZERO calories",
    suggestion: "Refer to approved nutritional facts database (FACT-04).",
    ruleCode: "CLAIM-01",
    confidence: "Deterministic Match",
    isResolved: false,
    guidelineId: "CLAIM-01",
    guidelineTitle: "Nutritional Claim Fact Verification",
    guidelineText: "All nutritional facts and pricing claims must strictly align with the approved facts database.",
    whyViolates: "Standard Campa Cola contains cane sugar; zero calories is factually inaccurate.",
    recommendedAction: "Remove 'ZERO calories' claim from marketing copy.",
    isGrounded: true,
  },
];

export const inMemorySubmissions = new Map<string, any>([
  [
    "campa-sub-01",
    {
      id: "campa-sub-01",
      title: "Campa Cola — Summer Refreshment Blast",
      contentText:
        "The BEST cola in India! Our Campa Cola 500ml bottle has ZERO calories and guarantees maximum energy for every celebration. Now only ₹5 at your nearest store.",
      tags: ["Summer2026", "SocialMedia", "Campaign"],
      status: "IN_REVIEW",
      brandProfileId: "brandflight-demo",
      creatorId: "usr_demo_creator",
      reviewerId: null,
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Chilled 500ml bottle of Campa Cola on ice with classic red wave branding and Great Indian Taste slogan",
      createdAt: new Date(Date.now() - 3600000),
      updatedAt: new Date(),
      creator: inMemoryUsers[0],
      reviewer: null,
      comments: [],
      findings: DEFAULT_FINDINGS,
      revisions: [
        {
          id: "rev-campa-01-1",
          version: 1,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          contentText:
            "The BEST cola in India! Our Campa Cola 500ml bottle has ZERO calories and guarantees maximum energy for every celebration. Now only ₹5 at your nearest store.",
          imageAltText: "Chilled 500ml bottle of Campa Cola on ice with classic red wave branding and Great Indian Taste slogan",
          imageUrl: "/campacola-campaign.png",
          imagePublicId: "inline-campa-01",
        },
      ],
      _count: { findings: 2, comments: 0, revisions: 1 },
    },
  ],
  [
    "campa-sub-02",
    {
      id: "campa-sub-02",
      title: "Campa Orange — Citrus Sparkle Social Promo",
      contentText:
        "Taste the sunshine! Campa Orange gives you authentic orange flavor with 100% natural fruit juice. Unmatched citrus energy in every 500ml sip for only ₹15.",
      tags: ["CampaOrange", "Citrus", "Promo"],
      status: "CHANGES_REQUESTED",
      brandProfileId: "brandflight-demo",
      creatorId: "usr_demo_creator",
      reviewerId: "usr_demo_reviewer",
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Campa Orange sparkling beverage bottle in sunlit summer background",
      createdAt: new Date(Date.now() - 7200000),
      updatedAt: new Date(),
      creator: inMemoryUsers[0],
      reviewer: inMemoryUsers[1],
      findings: [DEFAULT_FINDINGS[0]],
      revisions: [
        {
          id: "rev-campa-02-1",
          version: 1,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          contentText:
            "Taste the sunshine! Campa Orange gives you authentic orange flavor with 100% natural fruit juice. Unmatched citrus energy in every 500ml sip for only ₹15.",
          imageAltText: "Campa Orange sparkling beverage bottle in sunlit summer background",
          imageUrl: "/campacola-campaign.png",
          imagePublicId: "inline-campa-02",
        },
      ],
      comments: [
        {
          id: "cmt-1",
          submissionId: "campa-sub-02",
          authorId: "usr_demo_reviewer",
          body: "Please update the claim: Campa Orange is formulated with permitted natural color and added fruit flavor, not 100% natural fruit juice. Also update pricing to approved MRP ₹20 for 500ml.",
          createdAt: new Date(),
          author: inMemoryUsers[1],
        },
      ],
      _count: { findings: 1, comments: 1, revisions: 1 },
    },
  ],
  [
    "campa-sub-03",
    {
      id: "campa-sub-03",
      title: "Campa Cola — The Great Indian Taste (National Launch)",
      contentText:
        "Refresh your celebrations with the classic taste of Campa Cola, bottled by Reliance Consumer Products Ltd. Best served chilled between 4°C and 8°C. 500ml bottle at MRP ₹20.",
      tags: ["NationalLaunch", "Heritage", "Approved"],
      status: "APPROVED",
      brandProfileId: "brandflight-demo",
      creatorId: "usr_demo_creator",
      reviewerId: "usr_demo_reviewer",
      imageName: "campacola-campaign.png",
      imageUrl: "/campacola-campaign.png",
      imageAltText: "Official Campa Cola 500ml bottle banner with verified high-contrast typography and authentic wave mark",
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(),
      creator: inMemoryUsers[0],
      reviewer: inMemoryUsers[1],
      comments: [
        {
          id: "cmt-campa-03-1",
          submissionId: "campa-sub-03",
          authorId: "usr_demo_reviewer",
          body: "REVIEWER OVERRIDE: Verified all product attributes against Reliance Consumer Products catalogue. MRP ₹20 for 500ml and serving temperature 4-8°C confirmed.",
          createdAt: new Date(Date.now() - 86000000),
          author: inMemoryUsers[1],
        },
      ],
      findings: [],
      revisions: [
        {
          id: "rev-campa-03-1",
          version: 1,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          contentText:
            "Refresh your celebrations with the classic taste of Campa Cola, bottled by Reliance Consumer Products Ltd. Best served chilled between 4°C and 8°C. 500ml bottle at MRP ₹20.",
          imageAltText: "Official Campa Cola 500ml bottle banner with verified high-contrast typography and authentic wave mark",
          imageUrl: "/campacola-campaign.png",
          imagePublicId: "inline-campa-03",
        },
      ],
      _count: { findings: 0, comments: 1, revisions: 1 },
    },
  ],
]);

export const inMemoryPassports = new Map<string, any>([
  [
    "campa-sub-03",
    {
      id: "pass_campa_03",
      submissionId: "campa-sub-03",
      passportHash: "campa-national-launch-passport-cert-2026-sha256",
      snapshot: {
        submissionId: "campa-sub-03",
        title: "Campa Cola — The Great Indian Taste (National Launch)",
        contentText:
          "Refresh your celebrations with the classic taste of Campa Cola, bottled by Reliance Consumer Products Ltd. Best served chilled between 4°C and 8°C. 500ml bottle at MRP ₹20.",
        brandProfileId: "brandflight-demo",
        brandName: "Campa Cola",
        reviewerId: "usr_demo_reviewer",
        reviewerEmail: "reviewer@brandflight.demo",
        approvedAt: new Date(Date.now() - 86400000).toISOString(),
        certification: "WCAG 2.2 AA Verified · Truth-Engine Certified · Zero Violations",
      },
      issuedAt: new Date(Date.now() - 86400000).toISOString(),
      createdAt: new Date(Date.now() - 86400000),
    },
  ],
]);

export const inMemoryComments = new Map<string, any>();

export function createFallbackPrismaClient() {
  return {
    $queryRaw: async () => [{ "?column?": 1 }],
    $transaction: async (cbOrList: any) => {
      if (typeof cbOrList === "function") {
        return cbOrList(createFallbackPrismaClient());
      }
      return Array.isArray(cbOrList) ? Promise.all(cbOrList) : [];
    },
    $disconnect: async () => {},

    brandProfile: {
      findUnique: async (args: any) => {
        const id = args?.where?.id;
        if (id && id !== inMemoryBrand.id && id !== "brandflight-demo") {
          return null;
        }
        const copy: any = { ...inMemoryBrand };
        if (args?.include) {
          if (args.include.rules) copy.rules = inMemoryBrand.rules.filter((r) => r.isActive);
          if (args.include.facts) copy.facts = inMemoryBrand.facts.filter((f) => f.isActive);
          if (args.include.assets) copy.assets = inMemoryBrand.assets;
        }
        return copy;
      },
      update: async (args: any) => {
        if (args?.data) {
          Object.assign(inMemoryBrand, args.data, { updatedAt: new Date() });
        }
        return inMemoryBrand;
      },
    },

    brandRule: {
      findFirst: async (args: any) => {
        const ruleCode = args?.where?.ruleCode;
        return inMemoryBrand.rules.find((r) => r.ruleCode === ruleCode) ?? null;
      },
      create: async (args: any) => {
        const newRule = { id: `rule-${Date.now()}`, ...args.data };
        inMemoryBrand.rules.push(newRule);
        return newRule;
      },
      update: async (args: any) => {
        const id = args?.where?.id;
        const target = inMemoryBrand.rules.find((r) => r.id === id);
        if (target) Object.assign(target, args.data);
        return target ?? args.data;
      },
      delete: async (args: any) => {
        const id = args?.where?.id;
        const idx = inMemoryBrand.rules.findIndex((r) => r.id === id);
        if (idx >= 0) inMemoryBrand.rules.splice(idx, 1);
        return { id };
      },
    },

    approvedFact: {
      findFirst: async (args: any) => {
        const factCode = args?.where?.factCode;
        return inMemoryBrand.facts.find((f) => f.factCode === factCode) ?? null;
      },
      create: async (args: any) => {
        const newFact = { id: `fact-${Date.now()}`, ...args.data };
        inMemoryBrand.facts.push(newFact);
        return newFact;
      },
      update: async (args: any) => {
        const id = args?.where?.id;
        const target = inMemoryBrand.facts.find((f) => f.id === id);
        if (target) Object.assign(target, args.data);
        return target ?? args.data;
      },
      delete: async (args: any) => {
        const id = args?.where?.id;
        const idx = inMemoryBrand.facts.findIndex((f) => f.id === id);
        if (idx >= 0) inMemoryBrand.facts.splice(idx, 1);
        return { id };
      },
    },

    brandAsset: {
      findUnique: async (args: any) => {
        const id = args?.where?.id;
        return inMemoryBrand.assets.find((a) => a.id === id) ?? inMemoryBrand.assets[0] ?? null;
      },
      upsert: async (args: any) => {
        const asset = { ...inMemoryBrand.assets[0], ...(args.update || args.create) };
        inMemoryBrand.assets[0] = asset;
        return asset;
      },
      update: async (args: any) => {
        Object.assign(inMemoryBrand.assets[0], args.data);
        return inMemoryBrand.assets[0];
      },
      delete: async () => inMemoryBrand.assets[0],
    },

    auditReceipt: {
      create: async (args: any) => {
        const receipt = {
          id: args.data.id,
          kind: args.data.kind,
          userId: args.data.userId,
          brandProfileId: args.data.brandProfileId,
          inputHash: args.data.inputHash,
          configHash: args.data.configHash,
          result: args.data.result,
          createdAt: new Date(),
        };
        inMemoryReceipts.set(receipt.id, receipt);
        return receipt;
      },
      findUnique: async (args: any) => {
        const id = args?.where?.id;
        return inMemoryReceipts.get(id) ?? null;
      },
    },

    user: {
      findUnique: async (args: any) => {
        const email = args?.where?.email;
        const id = args?.where?.id;
        return (
          inMemoryUsers.find((u) => (email && u.email.toLowerCase() === email.toLowerCase()) || (id && u.id === id)) ??
          null
        );
      },
      create: async (args: any) => {
        const newUser = { id: `usr_${Date.now()}`, ...args.data, createdAt: new Date() };
        inMemoryUsers.push(newUser);
        return newUser;
      },
    },

    submission: {
      findUnique: async (args: any) => {
        const id = args?.where?.id;
        const sub = inMemorySubmissions.get(id);
        if (!sub) return null;
        const findings = sub.findings ?? DEFAULT_FINDINGS;
        const comments = Array.from(inMemoryComments.values()).filter((c) => c.submissionId === id);
        const revisions = sub.revisions ?? [
          {
            id: `rev-${sub.id}-1`,
            version: 1,
            createdAt: sub.createdAt ? new Date(sub.createdAt).toISOString() : new Date().toISOString(),
            contentText: sub.contentText,
            imageAltText: sub.imageAltText ?? null,
            imageUrl: sub.imageUrl ?? null,
            imagePublicId: sub.imagePublicId ?? null,
          },
        ];
        const passport = inMemoryPassports.get(sub.id) ?? sub.releasePassport ?? null;
        return {
          ...sub,
          brandProfile: { id: inMemoryBrand.id, name: inMemoryBrand.name },
          creator: inMemoryUsers.find((u) => u.id === sub.creatorId) ?? inMemoryUsers[0],
          reviewer: sub.reviewerId ? inMemoryUsers.find((u) => u.id === sub.reviewerId) : null,
          findings,
          comments: sub.comments?.length ? sub.comments : comments,
          revisions,
          releasePassport: passport,
          _count: {
            findings: findings.length,
            comments: (sub.comments?.length ? sub.comments : comments).length,
            revisions: revisions.length,
          },
        };
      },
      findMany: async (args: any) => {
        let list = Array.from(inMemorySubmissions.values());
        if (args?.where?.brandProfileId) {
          list = list.filter((s) => s.brandProfileId === args.where.brandProfileId);
        }
        if (args?.where?.creatorId) {
          list = list.filter((s) => s.creatorId === args.where.creatorId);
        }
        if (args?.where?.status) {
          if (typeof args.where.status === "string") {
            list = list.filter((s) => s.status === args.where.status);
          } else if (args.where.status.in) {
            list = list.filter((s) => args.where.status.in.includes(s.status));
          }
        }
        if (Array.isArray(args?.where?.OR)) {
          list = list.filter((s) => {
            return args.where.OR.some((condition: any) => {
              if (condition.status && s.status !== condition.status) return false;
              if (condition.reviewerId && s.reviewerId !== condition.reviewerId) return false;
              if (condition.creatorId && s.creatorId !== condition.creatorId) return false;
              return true;
            });
          });
        }
        return list.map((sub) => {
          const findings = sub.findings ?? DEFAULT_FINDINGS;
          const comments = Array.from(inMemoryComments.values()).filter((c) => c.submissionId === sub.id);
          const revisions = sub.revisions ?? [
            {
              id: `rev-${sub.id}-1`,
              version: 1,
              createdAt: sub.createdAt ? new Date(sub.createdAt).toISOString() : new Date().toISOString(),
              contentText: sub.contentText,
              imageAltText: sub.imageAltText ?? null,
              imageUrl: sub.imageUrl ?? null,
              imagePublicId: sub.imagePublicId ?? null,
            },
          ];
          const passport = inMemoryPassports.get(sub.id) ?? sub.releasePassport ?? null;
          return {
            ...sub,
            brandProfile: { id: inMemoryBrand.id, name: inMemoryBrand.name },
            creator: inMemoryUsers.find((u) => u.id === sub.creatorId) ?? inMemoryUsers[0],
            reviewer: sub.reviewerId ? inMemoryUsers.find((u) => u.id === sub.reviewerId) : null,
            findings,
            comments: sub.comments?.length ? sub.comments : comments,
            revisions,
            releasePassport: passport ? { id: passport.id, passportHash: passport.passportHash, issuedAt: passport.issuedAt } : null,
            _count: {
              findings: findings.length,
              comments: (sub.comments?.length ? sub.comments : comments).length,
              revisions: revisions.length,
            },
          };
        });
      },
      create: async (args: any) => {
        const id = `sub-${Date.now()}`;
        const newSub = {
          id,
          ...args.data,
          createdAt: new Date(),
          updatedAt: new Date(),
          findings: args.data?.findings ?? [],
          comments: [],
          revisions: [
            {
              id: `rev-${id}-1`,
              version: 1,
              createdAt: new Date().toISOString(),
              contentText: args.data?.contentText ?? "",
              imageAltText: args.data?.imageAltText ?? null,
              imageUrl: args.data?.imageUrl ?? null,
              imagePublicId: args.data?.imagePublicId ?? null,
            },
          ],
          _count: { findings: (args.data?.findings ?? []).length, comments: 0, revisions: 1 },
        };
        inMemorySubmissions.set(id, newSub);
        return {
          ...newSub,
          brandProfile: { id: inMemoryBrand.id, name: inMemoryBrand.name },
          creator: inMemoryUsers.find((u) => u.id === newSub.creatorId) ?? inMemoryUsers[0],
        };
      },
      update: async (args: any) => {
        const id = args?.where?.id;
        const existing = inMemorySubmissions.get(id);
        if (existing) {
          Object.assign(existing, args.data, { updatedAt: new Date() });
          inMemorySubmissions.set(id, existing);
          return {
            ...existing,
            creator: inMemoryUsers.find((u) => u.id === existing.creatorId) ?? inMemoryUsers[0],
            reviewer: existing.reviewerId ? inMemoryUsers.find((u) => u.id === existing.reviewerId) : null,
          };
        }
        return args.data;
      },
    },

    comment: {
      findMany: async (args: any) => {
        const subId = args?.where?.submissionId;
        const list = Array.from(inMemoryComments.values()).filter((c) => !subId || c.submissionId === subId);
        return list.map((c) => ({
          ...c,
          author: inMemoryUsers.find((u) => u.id === c.authorId) ?? inMemoryUsers[1],
        }));
      },
      create: async (args: any) => {
        const id = `cmt-${Date.now()}`;
        const newComment = {
          id,
          ...args.data,
          createdAt: new Date(),
          author: inMemoryUsers.find((u) => u.id === args.data.authorId) ?? inMemoryUsers[1],
        };
        inMemoryComments.set(id, newComment);
        return newComment;
      },
    },

    releasePassport: {
      findUnique: async (args: any) => {
        const subId = args?.where?.submissionId;
        return inMemoryPassports.get(subId) ?? null;
      },
      create: async (args: any) => {
        const passport = { id: `pass-${Date.now()}`, ...args.data, createdAt: new Date() };
        inMemoryPassports.set(args.data.submissionId, passport);
        return passport;
      },
      upsert: async (args: any) => {
        const subId = args?.where?.submissionId;
        const passport = { id: `pass-${Date.now()}`, ...args.create, ...args.update, createdAt: new Date() };
        inMemoryPassports.set(subId, passport);
        return passport;
      },
    },
  };
}
