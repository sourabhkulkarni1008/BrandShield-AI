# Brand Shield AI

**Enterprise AI-Powered Brand Governance, Preflight Violation Detection &amp; Cryptographic Claim Verification.**

Brand Shield AI enables marketing and brand protection teams to audit campaign content against strict brand rules, verified factual truth, and WCAG visual accessibility standards before publication. Creators can audit copy, detect compliance violations, and request structured exceptions, while Reviewers and Managers govern policies and issue verifiable, tamper-evident cryptographic Release Passports.

---

## Live Deployment & Repository

| Resource | Link |
|---|---|
| **Source Repository** | [https://github.com/sourabhkulkarni1008/BrandShield-AI](https://github.com/sourabhkulkarni1008/BrandShield-AI) |
| **Frontend Deployment** | [Vercel](https://vercel.com) (`vercel.json` configured at root & frontend) |
| **Backend API Engine** | Express 5 + TypeScript + Prisma 7 |
| **Public Verification Portal** | `/passport/:passportId` |

---

## What Brand Shield AI Does

Brand Shield AI unites automated AI governance, deterministic rule enforcement, and human sign-off into a unified workflow:

1. **Brand Profile & Rulebook Governance**: A Manager maintains the brand profile, prohibited/required terminology, factual claims, color palette, accessibility targets, and approved brand assets (logos, typography).
2. **Campaign Preparation**: A Creator crafts marketing copy and uploads campaign imagery with descriptive alt text.
3. **Automated Preflight Auditing**: Brand Shield AI performs real-time deterministic and semantic checks across text and visual assets:
   - **Text Preflight**: Flags prohibited terminology, unverified claims, and tone inconsistencies.
   - **Computer Vision & Contrast**: Locates text regions, calculates RGB pixel luminance ratios, verifies WCAG 2.2 AAA/AA compliance, and validates official logo presence.
4. **Remediation & Structured Exceptions**: The Creator fixes highlighted issues using one-click replacements or submits a structured exception override request with justification (**Rule unclear**, **Channel exception**, or **False positive**).
5. **Human-in-the-Loop Review**: A Reviewer or Manager inspects the campaign, reviews word-level revision diffs (`CampaignChangeIntelligence`), rules on override requests, and provides threaded feedback.
6. **Cryptographic Release Passports**: When approved, Brand Shield AI issues an immutable, signed SHA-256 Release Passport binding the exact campaign snapshot, audit receipts, brand configuration, and reviewer signature.

---

## Core Capabilities

### 1. Deterministic Rulebook & Approved Truth Engine
- Define custom brand rules with regex patterns and categorized severity levels (`INFO`, `WARNING`, `ERROR`).
- Maintain an immutable factual claim database with source citations.
- Enforce strict brand color palettes and role-based accessibility contrast pairs.
- Register official logo assets for automated image matching.
- Import and export governance rulebooks via JSON.

### 2. Multi-Tier Text Preflight
- **Deterministic Checking**: Instantly flags banned terms and numerical claims that conflict with approved truth.
- **AI Semantic Analysis**: Google Gemini evaluates tone, nuance, regulatory risks, and provides safe alternative phrasing.
- **Privacy Masking**: Pattern-based PII redaction masks sensitive details (emails, phone numbers, identifiers, payment card numbers) prior to semantic analysis.

### 3. Visual Preflight & Pixel-Level Contrast
- Sharp-powered image dimension, palette, and dominant color inspection.
- Optical Character Recognition (OCR) text region detection.
- Accurate pixel-sampling contrast ratio calculations against active WCAG standards (4.5:1 for normal text, 3:1 for large text).
- Official logo detection and wordmark matching against approved brand references.

### 4. Revision Intelligence & Change Comparison
- Side-by-side and inline word-level diffing between saved campaign revisions.
- Visual asset change alerts (detects image replacement and alt-text modifications).
- Historical audit trail tracking every iteration prior to final approval.

### 5. Cryptographic Release Passports
- Generates a tamper-evident SHA-256 snapshot of the approved copy, image assets, rulebook version, and reviewer decision.
- HMAC-signed release receipts protect against post-approval tampering.
- Standalone public verification endpoint (`/passport/:passportId`) allows stakeholders to independently verify approval validity.

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, TypeScript, Vite 8, React Router v7, Lucide Icons | Responsive Glassmorphic UI, Interactive Landing Page, Creator Workspace, Review Queue, Manager Governance Dashboard |
| **Backend API** | Node.js, Express 5, TypeScript | REST endpoints, authentication middleware, validation, workflow orchestration |
| **Database & ORM** | PostgreSQL, Prisma 7, `@prisma/adapter-pg` | User accounts, brand profiles, rules, verified facts, submissions, revisions, audit receipts, release passports |
| **AI & Vision** | Google GenAI SDK (`gemini-3.5-flash-lite`), Sharp | Semantic tone analysis, claim verification, copy refinement, RGB pixel sampling |
| **Asset Storage** | Cloudinary | Secure storage for campaign imagery and approved brand logos |
| **Deployment** | Vercel (Frontend), Render / Neon (Backend & Database) | Zero-downtime hosting with monorepo `vercel.json` orchestration |

---

## Project Structure

```text
BRAND SHIELD AI/
├── vercel.json                 # Monorepo Vercel build & SPA routing configuration
├── README.md                   # System documentation & operating guide
├── .gitignore                  # Multi-tier git exclusion rules
│
├── frontend/                   # React 19 + TypeScript + Vite 8 Client
│   ├── public/
│   │   ├── brandshield-mark.svg # Brand Shield AI vector logo
│   │   ├── favicon.svg         # High-resolution vector favicon
│   │   └── pahariknits-logo.png# Sample brand logo asset
│   ├── src/
│   │   ├── BrandShieldLogo.tsx # Reusable cybernetic AI shield emblem
│   │   ├── LandingPage.tsx     # Futuristic interactive Landing Page
│   │   ├── LandingPage.css     # Glassmorphic cyber design styles
│   │   ├── App.tsx             # Workspace state, routing & preflight orchestrator
│   │   ├── App.css             # Component styling & layout rules
│   │   ├── index.css           # Modern cyber-glass design system tokens
│   │   ├── ManagerDashboard.tsx# Governance insights & override violation radar
│   │   ├── ReviewQueuePanel.tsx# Campaign review workspace & approval gateway
│   │   ├── SavedSubmissionsPanel.tsx # Saved drafts & submission history
│   │   ├── RulebookPanel.tsx   # Brand rules, approved facts & asset configuration
│   │   ├── ReleasePassportCard.tsx # Verifiable passport display card
│   │   ├── ReleasePassportVerificationPage.tsx # Public verification portal
│   │   └── lib/                # WCAG contrast math & accessibility standards
│   └── package.json
│
└── backend/                    # Express 5 + TypeScript + Prisma 7 API
    ├── prisma/
    │   ├── schema.prisma       # PostgreSQL relational data models
    │   └── seed.ts             # Default brand profiles and demo accounts
    ├── src/
    │   ├── routes/             # Auth, brands, image-audit, submissions endpoints
    │   ├── lib/                # Gemini, Sharp, WCAG, PII masking, Release Passports
    │   └── server.ts           # API entry point & middleware
    └── package.json
```

---

## Getting Started Locally

### Prerequisites

* **Node.js**: v18+ (v20+ recommended)
* **PostgreSQL**: Local instance or cloud database (e.g., Neon, Supabase)
* **Gemini API Key**: (Optional, enables semantic AI preflight)
* **Cloudinary Account**: (Optional, enables image upload & asset hosting)

---

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Configure `backend/.env` with your environment credentials:

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/brandshield?schema=public"
JWT_SECRET="super-secret-random-key-at-least-32-chars-long"
CLIENT_URL="http://localhost:5173"
PORT=3000
DEMO_LOGIN_ENABLED="true"
GEMINI_API_KEY="your-gemini-api-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Initialize database tables and seed demo accounts:

```bash
npx prisma generate --config prisma7.config.ts
npx prisma migrate deploy --config prisma7.config.ts
npx prisma db seed --config prisma7.config.ts
```

Start the API server:

```bash
npm run dev
```

The API will be live at `http://localhost:3000`. Test health with:
```bash
curl http://localhost:3000/api/health
```

---

### 2. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Configure `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:3000
VITE_DEMO_MODE=true
```

Start the Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to experience the **Brand Shield AI** landing page and workspaces.

---

## Interactive Role Walkthrough

When `VITE_DEMO_MODE=true` is enabled, visitors can test the system directly from the landing page using 1-click demo accounts:

| Role | Demo Account | Focus Area |
|---|---|---|
| **Marketing Creator** | `creator@brandflight.demo` | Audit copy in real time, upload creative imagery, inspect pixel contrast, request structured overrides, and submit drafts for review. |
| **Brand Reviewer** | `reviewer@brandflight.demo` | Inspect in-review campaigns, compare word-level revisions, rule on exception requests, and issue signed Release Passports. |
| **Brand Manager** | `manager@brandflight.demo` | Configure brand rules, facts, approved logos, test accessibility color swatches, and track violation analytics. |

---

## Testing & Quality Assurance

### Run Frontend Suite
```bash
cd frontend
npm run build    # TypeScript compilation & production bundling
npm test         # Unit tests for WCAG contrast & swatch algorithms
```

### Run Backend Suite
```bash
cd backend
npm run build    # TypeScript compilation
npm test         # Unit & integration test suites
```

---

## Deployment Guide (Vercel)

This repository includes a root `vercel.json` and a `frontend/vercel.json` configured for seamless zero-config deployment:

1. Connect your repository to **Vercel**.
2. Set Environment Variables in Vercel Project Settings:
   - `VITE_API_URL`: Your deployed backend API origin (e.g., `https://api.yourdomain.com`).
   - `VITE_DEMO_MODE`: Set to `true` to enable 1-click role exploration buttons.
3. Deploy! Vercel will automatically build the frontend and serve it with complete Single Page Application routing.

---

## Author & Credits

* **Platform**: Brand Shield AI
* **Repository**: [sourabhkulkarni1008/BrandShield-AI](https://github.com/sourabhkulkarni1008/BrandShield-AI)
* **Author**: Sourabh Kulkarni ([@sourabhkulkarni1008](https://github.com/sourabhkulkarni1008))
* **License**: MIT
