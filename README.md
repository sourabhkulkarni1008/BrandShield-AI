# Brand Shield AI

**Autonomous Enterprise Brand Governance, Pre-Publication Verification & Cryptographic Release Passports**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/Frontend-React%2019-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%205-339933.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%7C%20Prisma%207-336791.svg)](https://www.prisma.io/)
[![WCAG 2.2](https://img.shields.io/badge/Standard-WCAG%202.2%20AA%2FAAA-10b981.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## 1. Project Title

**Brand Shield AI** — Enterprise Brand Governance & Pre-Publication Verification Platform.

| Resource | URL |
| :--- | :--- |
| **Custom Domain** | [https://brandshield.cv](https://brandshield.cv) |
| **Live Vercel Application** | [https://brand-shield-ai-six.vercel.app](https://brand-shield-ai-six.vercel.app) |
| **Production Backend API** | [https://brandshield-ai-ipfn.onrender.com](https://brandshield-ai-ipfn.onrender.com) |
| **Health Check Endpoint** | [https://brandshield-ai-ipfn.onrender.com/api/health](https://brandshield-ai-ipfn.onrender.com/api/health) |
| **Public Passport Verification** | `https://brand-shield-ai-six.vercel.app/passport/:passportId` |
| **Source Repository** | [https://github.com/sourabhkulkarni1008/BrandShield-AI](https://github.com/sourabhkulkarni1008/BrandShield-AI) |

---

## 2. Project Overview

Brand Shield AI is a production-grade pre-publication brand governance, regulatory compliance, and cryptographic claim verification platform. It automates the review of marketing copy, creative imagery, and visual accessibility standards before content is published to advertising platforms, social media, or customer-facing channels.

Rather than relying on informal proofreading or generic LLM prompts, Brand Shield AI provides a deterministic, multi-tier inspection pipeline:
- **Deterministic Pattern Verification**: Real-time evaluation against brand-specific prohibited terms, required disclaimers, and regulatory guidelines.
- **Factual Truth Engine**: Automated extraction of statistical and numerical claims, verified against an immutable, source-cited database of approved brand facts to prevent marketing hallucinations.
- **Privacy-Preserving Semantic Analysis**: Pattern-based PII redaction (email, telephone, Aadhaar, PAN, payment card numbers) protects sensitive data before Google Gemini analyzes copy for tone drift and regulatory nuance.
- **Computer Vision & Pixel-Sampling WCAG Audit**: Sharp-powered pixel luminance sampling measures text-to-background contrast ratios against WCAG 2.2 AA (4.5:1 / 3:1) and AAA standards, and confirms the presence of approved brand wordmarks.
- **Cryptographic Release Passports**: Final campaign approvals generate an immutable, tamper-evident SHA-256 release receipt, HMAC-signed with the reviewer's authorization and verifiable on a public verification portal.

---

## 3. Problem Statement

Modern enterprise marketing teams publish content across dozens of social networks, ad channels, and customer touchpoints at unprecedented velocity. This operational speed introduces critical corporate risks:

1. **Regulatory & Legal Liability**: Marketing copy frequently introduces unsubstantiated claims, non-compliant promotional statistics, or prohibited phrasing that violate regulatory standards (FTC, ASCI, GDPR).
2. **Brand Dilution & Voice Inconsistency**: Fast iteration leads to tone drift, forbidden vocabulary, off-brand messaging, and incorrect taglines.
3. **Accessibility Violations (WCAG Non-Compliance)**: Text embedded in promotional graphics often fails color contrast accessibility requirements (WCAG 2.2 Level AA/AAA), alienating users with visual impairments and exposing corporations to accessibility lawsuits.
4. **Data Leakage in AI Workflows**: Sending raw marketing copy and customer data to external AI models risks leaking Personally Identifiable Information (PII) or confidential intellectual property.
5. **No Immutable Audit Trail**: Traditional approvals happen across disjointed chat threads, emails, and project management tools, leaving no verifiable cryptographic proof of what was reviewed, who approved it, and which rulebook version governed the decision.

---

## 4. Project Objectives

- **Automate Governance**: Reduce human review bottlenecks by 80% with deterministic preflight checks.
- **Enforce Truth**: Eliminate marketing hallucinations by strictly binding numerical claims to citation-backed facts.
- **Guarantee Visual Accessibility**: Provide pixel-precise WCAG 2.2 contrast validation for creative visual assets.
- **Protect Data Privacy**: Ensure 100% of sensitive PII is redacted locally prior to any third-party AI semantic processing.
- **Provide Immutable Auditability**: Issue tamper-evident cryptographic Release Passports that prove pre-publication compliance.

---

## 5. Key Features

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Deterministic Rulebook Engine** | Regex-based pattern matching for prohibited words, required disclaimers, and tone rules categorized by severity (`INFO`, `WARNING`, `ERROR`). | Implemented |
| **Approved Truth Database** | Curated catalog of approved factual claims with external citations; detects and blocks unsupported numerical expressions. | Implemented |
| **PII Redaction Pipeline** | Regex-based masking of email addresses, phone numbers, Indian Aadhaar, PAN, and Luhn-valid payment card numbers before semantic LLM evaluation. | Implemented |
| **AI Semantic Copy Audit** | Google Gemini (`gemini-3.5-flash-lite`) evaluates subtle tone nuances, regulatory implications, and generates one-click remediation suggestions. | Implemented |
| **Pixel-Sampling Contrast Audit** | Sharp-powered computer vision samples text bounding boxes and halos to calculate exact relative luminance contrast ratios against WCAG 2.2 standards. | Implemented |
| **Official Logo Detection** | Automated inspection of uploaded images for registered brand logos and approved wordmarks. | Implemented |
| **Campaign Bundling** | Binds multi-modal assets (draft copy + creative imagery + alt text + audit receipts) into a single auditable submission record. | Implemented |
| **Campaign Change Intelligence** | Word-level side-by-side and inline revision diffing to track copy alterations, image replacements, and alt-text changes across drafts. | Implemented |
| **Structured Exception Requests** | Formal workflow allowing creators to submit override justifications (`RULE_UNCLEAR`, `CHANNEL_EXCEPTION`, `FALSE_POSITIVE`) for reviewer adjudication. | Implemented |
| **Human-in-the-Loop Review Queue** | Reviewer interface with status filtering, threaded comments, findings inspection, and change request feedback. | Implemented |
| **Cryptographic Release Passports** | Generates an immutable SHA-256 snapshot of approved content, audit receipts, rulebook hash, and reviewer signature. | Implemented |
| **Public Passport Verification** | Standalone public portal (`/passport/:passportId`) allowing external stakeholders to independently verify approval validity and tamper status. | Implemented |
| **Manager Governance Dashboard** | Analytics view tracking top violated rules, human override frequencies, and brand risk trends. | Implemented |
| **Rulebook Import/Export** | JSON-based import and export of complete brand governance rules, facts, color palettes, and accessibility configurations. | Implemented |
| **Role-Based Access Control (RBAC)**| Granular access levels for `CREATOR`, `REVIEWER`, and `MANAGER` roles with JWT authentication and passwordless demo evaluation mode. | Implemented |

---

## 6. Technology Stack

### Frontend Architecture
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 19.3.1 | Core user interface library |
| **TypeScript** | 6.0.3 | Static typing and interface contracts |
| **Vite** | 8.3.4 | Build tooling and fast development server |
| **React Router DOM**| 7.18.5 | Declarative client-side routing |
| **Lucide React** | 1.77.0 | Consistent iconography |
| **Native Fetch API** | Web Standard | Communication with backend REST API |

### Backend Architecture
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | >= 20.x | JavaScript server runtime |
| **Express** | 5.3.0 | HTTP application framework |
| **TypeScript** | 7.0.2 | Server-side static typing |
| **TSX** | 4.23.15 | TypeScript execution and test runner |
| **Multer** | 2.5.0 | Multipart form-data handling for image uploads |
| **CORS** | 2.8.6 | Cross-origin resource sharing configuration |

### Database & ORM
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **PostgreSQL** | 16+ | Relational data persistence |
| **Prisma ORM** | 7.10.1 | Type-safe database queries and migrations |
| **@prisma/adapter-pg**| 7.10.1 | Native PostgreSQL connection adapter |

### AI & Computer Vision
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **@google/genai** | 2.31.0 | Official Google GenAI SDK for Gemini 3.5 Flash Lite |
| **Sharp** | 0.35.5 | High-performance image pixel processing and luminance extraction |

### Authentication & Cryptography
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **JSON Web Tokens (JWT)**| 9.0.3 | Stateless session token generation and verification |
| **bcryptjs** | 3.0.3 | Password hashing with salt |
| **Node.js Crypto** | Native | SHA-256 hashing and HMAC signatures for Release Passports |

### External Services & Storage
| Technology | Purpose |
| :--- | :--- |
| **Cloudinary** | Cloud-based image storage for creative assets and approved brand logos |
| **Render** | Production web service hosting for backend Node.js API |
| **Vercel** | Edge network hosting for React frontend |

---

## 7. System Architecture

Brand Shield AI operates as a decoupled architecture where the React SPA interfaces with a RESTful Express 5 API. The backend orchestrates database persistence via Prisma 7, manages image processing pipelines via Sharp, and interfaces with Google Gemini for semantic intelligence.

```mermaid
flowchart TD
    subgraph Client["Client Tier (Vercel)"]
        UI["Brand Shield AI SPA (React 19)"]
        Router["React Router v7"]
        Store["Session State & Token Storage"]
        UI --> Router
        Router --> Store
    end

    subgraph API["Application Tier (Render)"]
        Server["Express 5 REST API"]
        AuthMiddleware["JWT & RBAC Middleware"]
        PIIMasking["PII Masking Pipeline"]
        VisionEngine["Sharp Pixel Contrast Engine"]
        AuditReceipts["Audit Receipt & Hash Engine"]
        PassportGen["Release Passport Generator"]

        Server --> AuthMiddleware
        Server --> PIIMasking
        Server --> VisionEngine
        Server --> AuditReceipts
        Server --> PassportGen
    end

    subgraph Data["Persistence & Services Tier"]
        DB[("PostgreSQL via Prisma 7")]
        Gemini["Google Gemini API (3.5-flash-lite)"]
        Cloudinary["Cloudinary CDN"]
    end

    UI -- "HTTPS REST (JSON / Multipart)" --> Server
    PIIMasking -- "Masked Prompts" --> Gemini
    VisionEngine -- "Uploads & Fetch" --> Cloudinary
    Server -- "Prisma Client (pg adapter)" --> DB
```

---

## 8. Application Workflows

### 8.1 Main Governance & Publication Lifecycle

```mermaid
flowchart TD
    Start(["Marketing Campaign Created"]) --> CreatorDraft["Creator drafts copy & uploads image"]
    CreatorDraft --> PreflightAudit["Run Automated Preflight Audit"]
    
    subgraph Preflight["Preflight Engine"]
        PreflightAudit --> RuleCheck{"Deterministic Rules Pass?"}
        RuleCheck -- "No" --> RuleFlags["Flag Banned Words / Format"]
        RuleCheck -- "Yes" --> ClaimCheck{"Numeric Claims Verified?"}
        ClaimCheck -- "No" --> ClaimFlags["Flag Unverified Statistics"]
        ClaimCheck -- "Yes" --> VisionCheck{"WCAG Contrast >= 4.5:1?"}
        VisionCheck -- "No" --> VisionFlags["Flag Accessibility Violation"]
        VisionCheck -- "Yes" --> GeminiSemantic["Gemini Tone & Safety Analysis"]
    end

    RuleFlags --> Remediation["Remediate Copy / Request Override"]
    ClaimFlags --> Remediation
    VisionFlags --> Remediation
    Remediation --> CreatorDraft

    GeminiSemantic --> Bundle["Generate Audit Receipts & Save Bundle"]
    Bundle --> SubmitQueue["Submit to Review Queue"]
    
    SubmitQueue --> ReviewerInspect["Reviewer inspects diffs & findings"]
    ReviewerInspect --> Decision{"Reviewer Decision"}
    
    Decision -- "Changes Requested" --> Feedback["Provide >=10 chars actionable feedback"]
    Feedback --> CreatorDraft
    
    Decision -- "Approved" --> IssuePassport["Issue Cryptographic Release Passport"]
    IssuePassport --> VerifiedLive(["Content Certified for Publication"])
```

### 8.2 User Authentication & Session Management

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Demo Evaluator
    participant Client as Frontend (React)
    participant Auth as Auth Controller (Express)
    participant DB as PostgreSQL (Prisma)

    User->>Client: Submit Login Credentials (or click Demo Role)
    Client->>Auth: POST /api/auth/login (or /demo-login)
    Auth->>DB: Query User & verify bcrypt passwordHash
    DB-->>Auth: User record (id, name, email, role)
    Auth->>Auth: Sign JWT with user payload & role
    Auth-->>Client: { token, user: { id, name, email, role } }
    Client->>Client: Store in sessionStorage (brandshield_token)
    Client->>Auth: GET /api/auth/me (Authorization: Bearer <token>)
    Auth-->>Client: 200 OK (Session Confirmed)
    Client->>Client: Navigate to role-specific workspace
```

### 8.3 Cryptographic Release Passport Verification

```mermaid
flowchart LR
    ApprovedSubmission["Approved Submission Snapshot"] --> CanonicalJSON["Canonicalize JSON Content & Receipts"]
    CanonicalJSON --> SHA256["Compute SHA-256 Digest"]
    SHA256 --> HMAC["Sign with HMAC-SHA256 Secret"]
    HMAC --> PassportRecord["Store in ReleasePassport Table"]
    
    PassportRecord --> PublicPortal["Public Portal: /passport/:id"]
    PublicPortal --> Recompute["Recompute Hash from Stored Snapshot"]
    Recompute --> Compare{"Digest & Signature Match?"}
    Compare -- "Valid" --> GreenBadge["Display Certified Release Badge (Tamper-Free)"]
    Compare -- "Invalid" --> RedWarning["Display Tamper Alert (Signature Mismatch)"]
```

### 8.4 Multi-Tier Data Flow

```mermaid
flowchart TD
    A["Raw Campaign Copy"] --> B["PII Masking Layer"]
    B -- "Redacted Input" --> C["Deterministic Regex & Fact Matcher"]
    B -- "Masked Tokens" --> D["Gemini 3.5 Flash Lite"]
    C --> E["Deterministic Findings"]
    D --> F["Restoration Layer (Unmask PII)"]
    F --> G["Semantic Findings & Suggestions"]
    E & G --> H["Combined Audit Receipt (SHA-256 Config Hash)"]
    
    I["Campaign Image"] --> J["Sharp Pixel Sampling"]
    J --> K["Luminance & Contrast Ratio Calculation"]
    J --> L["Logo Wordmark OCR Matching"]
    K & L --> M["Image Audit Receipt"]
    
    H & M --> N["Campaign Bundle Draft"]
```

---

## 9. Feature Documentation

### 9.1 Deterministic Rulebook & Factual Truth Engine
- **Purpose**: Prevents off-brand messaging and unverified statistical claims from entering customer-facing copy.
- **How It Works**: 
  - Rules are stored in PostgreSQL with specific categories (`TONE`, `TERMINOLOGY`, `CLAIM`, `VISUAL`, `ACCESSIBILITY`) and severities (`INFO`, `WARNING`, `ERROR`).
  - Text is checked against regular expressions and normalized keyword tokens.
  - An AST-like regular expression extractor isolates numbers, percentages, and currencies, matching them against approved `ApprovedFact` entries. Any unmatched number is flagged as an unverified claim.

### 9.2 Privacy-Preserving Semantic Analysis
- **Purpose**: Enables deep semantic understanding and copy refinement without leaking confidential customer data or personal identifiers to third-party AI APIs.
- **How It Works**:
  - The `pii-masking.ts` pipeline replaces emails, Indian telephone numbers, Aadhaar cards, PAN IDs, and credit card numbers (verified via Luhn's algorithm) with session-scoped pseudonymous tokens (`{{EMAIL_1}}`, `{{PHONE_1}}`).
  - Redacted text is evaluated by Google Gemini (`gemini-3.5-flash-lite`).
  - Gemini's response is mapped back to the original text via reverse substitution before displaying suggestions to the user.

### 9.3 Pixel-Level WCAG 2.2 Contrast & Computer Vision
- **Purpose**: Guarantees that promotional banners and creative graphics satisfy accessibility regulations before distribution.
- **How It Works**:
  - Uploaded images are processed in-memory using `sharp`.
  - The pipeline locates text bounding boxes, samples glyph pixel values, and compares them with surrounding background halo pixels.
  - The relative luminance ($L = 0.2126R + 0.7152G + 0.0722B$) is computed. Contrast ratio is calculated as:
    $$\text{Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
  - Evaluates normal text against the 4.5:1 threshold and large text against 3:1.

### 9.4 Campaign Change Intelligence
- **Purpose**: Gives reviewers instant visibility into what changed between revision cycles.
- **How It Works**:
  - Every draft update increments the campaign's revision version.
  - The frontend `CampaignChangeIntelligence` component computes a word-level diff, rendering additions in high-contrast emerald and removals in rose strikethrough.
  - Highlights image asset changes and alt-text modifications across revisions.

### 9.5 Cryptographic Release Passports
- **Purpose**: Establishes an immutable, tamper-evident record of approval.
- **How It Works**:
  - When a Reviewer approves a submission, a canonical JSON object is constructed containing the exact copy, image asset URL, audit receipt IDs, brand profile ID, and reviewer metadata.
  - A SHA-256 digest is generated and HMAC-signed using the application secret.
  - The resulting passport hash is saved to the `ReleasePassport` table. Anyone visiting `/passport/:passportId` can independently verify that the snapshot matches the cryptographic signature.

---

## 10. Project Directory Structure

```
BRAND SHIELD/
├── backend/
│   ├── prisma/
│   │   ├── migrations/              # PostgreSQL database migrations
│   │   ├── schema.prisma            # Prisma schema (10 models, 6 enums)
│   │   └── seed.ts                  # Seed script for demo accounts & PahariKnits brand
│   ├── src/
│   │   ├── lib/
│   │   │   ├── audit-receipts.ts    # SHA-256 config & input hashing
│   │   │   ├── gemini.ts            # Google GenAI semantic analysis
│   │   │   ├── governance-insights.ts # Manager violation analytics
│   │   │   ├── image-text-contrast.ts # Image contrast orchestration
│   │   │   ├── image-text-pixels.ts # Sharp pixel sampling algorithm
│   │   │   ├── numeric-claims.ts    # Number extraction & fact verification
│   │   │   ├── pii-masking.ts       # Privacy redaction pipeline
│   │   │   ├── prisma.ts            # Prisma client instance
│   │   │   ├── release-gate.ts      # Automated release gate validation
│   │   │   ├── release-passport.ts  # HMAC Release Passport generator
│   │   │   ├── review-validation.ts # Review decision schema validation
│   │   │   └── wcag-contrast.ts     # WCAG relative luminance math
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT authentication & RBAC middleware
│   │   ├── routes/
│   │   │   ├── auth.ts              # Authentication & demo login endpoints
│   │   │   ├── brands.ts            # Brand profile, rules, facts & logo routes
│   │   │   ├── image-audit.ts       # Image upload & vision audit routes
│   │   │   └── submissions.ts       # Submissions, reviews, overrides & passports
│   │   ├── index.ts                 # Express application definition
│   │   └── server.ts                # Server entrypoint & DB migration runner
│   ├── test/                        # 11 backend unit & integration test suites
│   ├── package.json                 # Backend dependencies & npm scripts
│   ├── prisma7.config.ts            # Prisma 7 configuration file
│   └── tsconfig.json                # TypeScript compiler configuration
├── frontend/
│   ├── public/
│   │   ├── brandshield-mark.svg     # Official Brand Shield vector mark
│   │   ├── favicon.svg              # Browser favicon
│   │   └── pahariknits-logo.png     # Seed brand fixture logo
│   ├── src/
│   │   ├── lib/
│   │   │   ├── imageAuditCopy.ts    # Image audit copy constants
│   │   │   ├── wcagContrast.ts      # WCAG relative luminance & contrast algorithms
│   │   │   └── wcagContrast.test.mjs# Frontend contrast unit tests
│   │   ├── App.css                  # Core component layouts & responsive styles
│   │   ├── App.tsx                  # Root state, header, navigation & creator workspace
│   │   ├── ApprovedCampaignsPanel.tsx # Approved campaign archive & passport links
│   │   ├── BrandAccessibilityStandards.tsx # Accessibility reference standards
│   │   ├── BrandContrastAnalyzer.tsx# Interactive WCAG color pair tool
│   │   ├── BrandFlightLogo.tsx      # Legacy compatibility wrapper
│   │   ├── BrandShieldLogo.tsx      # Brand Shield AI vector logo component
│   │   ├── BrandShieldTheme.css     # Unified cyber-glass design system tokens
│   │   ├── CampaignChangeIntelligence.tsx # Revision diff engine
│   │   ├── ImageTextContrastReport.tsx # Sampled pixel contrast inspection view
│   │   ├── index.css                # Global canvas reset & typography definitions
│   │   ├── LandingPage.css          # Landing page styles
│   │   ├── LandingPage.tsx          # Public landing page with interactive demo
│   │   ├── main.tsx                 # Entrypoint & router configuration
│   │   ├── ManagerDashboard.tsx     # Governance metrics & override audit log
│   │   ├── ReleasePassportCard.tsx  # Cryptographic passport card widget
│   │   ├── ReleasePassportVerificationPage.tsx # Public verification portal
│   │   ├── ReviewQueuePanel.tsx     # Reviewer queue & decision modal
│   │   ├── RulebookPanel.tsx        # Manager brand rules, facts & asset editor
│   │   └── SavedSubmissionsPanel.tsx# Creator draft submission management
│   ├── index.html                   # HTML template with metadata & font imports
│   ├── package.json                 # Frontend dependencies & npm scripts
│   ├── tsconfig.json                # TypeScript compiler configuration
│   └── vercel.json                  # SPA client rewrite rules
├── .gitignore                       # Repository ignore rules
├── README.md                        # Project documentation
├── render.yaml                      # Render infrastructure blueprint
└── vercel.json                      # Root deployment orchestrator
```

---

## 11. Installation and Setup

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **PostgreSQL**: PostgreSQL 16+ instance (local or hosted on Neon/Supabase)

### 1. Clone the Repository
```bash
git clone https://github.com/sourabhkulkarni1008/BrandShield-AI.git
cd BrandShield-AI
```

### 2. Configure Environment Variables
Create `.env` inside `backend/`:
```bash
cp backend/.env.example backend/.env
```
Populate the required database connection string and secret keys in `backend/.env`.

### 3. Install Backend Dependencies & Initialize Database
```bash
cd backend
npm install
npx prisma generate --config prisma7.config.ts
npx prisma migrate deploy --config prisma7.config.ts
npx tsx prisma/seed.ts
```

### 4. Start the Backend Development Server
```bash
npm run dev
# Server starts on http://localhost:3000
```

### 5. Install Frontend Dependencies & Start Client
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
# Frontend starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## 12. Environment Variables

### Backend Configuration (`backend/.env`)

| Variable | Purpose | Required |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string (`postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require`) | **Yes** |
| `JWT_SECRET` | Secret key for signing and verifying JWT tokens (min 32 characters) | **Yes** |
| `PORT` | HTTP port on which the Express server listens (default: `3000`) | No |
| `CLIENT_URL` | Allowed origin for Cross-Origin Resource Sharing (CORS) | No |
| `RELEASE_PASSPORT_SECRET` | Stable HMAC key for signing Release Passports (falls back to `JWT_SECRET` if unset) | No |
| `GEMINI_API_KEY` | Google Gemini API key for semantic audits and copy refinement | No *(Required for AI checks)* |
| `GEMINI_MODEL` | Gemini model variant (default: `gemini-3.5-flash-lite`) | No |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier for storing uploaded campaign imagery | No *(Required for image uploads)* |
| `CLOUDINARY_API_KEY` | Cloudinary API access key | No *(Required for image uploads)* |
| `CLOUDINARY_API_SECRET` | Cloudinary API access secret | No *(Required for image uploads)* |
| `DEMO_LOGIN_ENABLED` | Enables one-click passwordless evaluator buttons (`true`/`false`) | No |
| `DEMO_CREATOR_PASSWORD` | Seed password for the demo Creator account | No |
| `DEMO_REVIEWER_PASSWORD`| Seed password for the demo Reviewer account | No |
| `DEMO_MANAGER_PASSWORD` | Seed password for the demo Manager account | No |

### Frontend Configuration (`frontend/.env`)

| Variable | Purpose | Required |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the backend API (e.g., `https://brandshield-ai-ipfn.onrender.com` or `http://localhost:3000`) | No *(Defaults to production Render URL in prod)* |
| `VITE_DEMO_MODE` | Exposes role-based one-click demo buttons in the UI (`true`/`false`) | No |

---

## 13. API Documentation

| HTTP Method | Endpoint | Purpose | Authentication |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service uptime and readiness probe | None (Public) |
| `POST` | `/api/auth/login` | Authenticate with email and password | None (Public) |
| `POST` | `/api/auth/demo-login` | Authenticate as demo `CREATOR`, `REVIEWER`, or `MANAGER` | None (Public) |
| `GET` | `/api/auth/me` | Fetch active user session metadata | Bearer Token |
| `GET` | `/api/brands/:brandProfileId` | Retrieve brand rulebook, facts, swatches, and logo | Bearer Token |
| `PATCH` | `/api/brands/:brandProfileId` | Update brand description, colors, or accessibility targets | Bearer Token (`MANAGER`) |
| `POST` | `/api/brands/:brandProfileId/assets/logo` | Upload official brand logo to Cloudinary | Bearer Token (`MANAGER`) |
| `PATCH` | `/api/brands/:brandProfileId/assets/logo` | Update approved logo metadata or expected wordmark | Bearer Token (`MANAGER`) |
| `DELETE`| `/api/brands/:brandProfileId/assets/logo` | Delete approved brand logo | Bearer Token (`MANAGER`) |
| `POST` | `/api/brands/:brandProfileId/rules` | Create a deterministic regex rule | Bearer Token (`MANAGER`) |
| `PUT` | `/api/brands/:brandProfileId/rules/:ruleId` | Update an existing brand rule | Bearer Token (`MANAGER`) |
| `DELETE`| `/api/brands/:brandProfileId/rules/:ruleId` | Delete a brand rule | Bearer Token (`MANAGER`) |
| `POST` | `/api/brands/:brandProfileId/facts` | Add an approved factual claim with citation | Bearer Token (`MANAGER`) |
| `PUT` | `/api/brands/:brandProfileId/facts/:factId` | Update an approved factual claim | Bearer Token (`MANAGER`) |
| `DELETE`| `/api/brands/:brandProfileId/facts/:factId` | Delete an approved factual claim | Bearer Token (`MANAGER`) |
| `POST` | `/api/brands/:brandProfileId/import` | Import complete brand rulebook JSON | Bearer Token (`MANAGER`) |
| `POST` | `/api/audit` | Execute multi-tier text preflight audit | Bearer Token (`CREATOR`) |
| `POST` | `/api/audit/refine` | Request AI copy refinement with PII masking | Bearer Token (`CREATOR`) |
| `POST` | `/api/audit/image` | Upload image for pixel contrast and logo verification | Bearer Token (`CREATOR`) |
| `GET` | `/api/submissions` | List submissions (supports `?scope=approved` filter) | Bearer Token |
| `POST` | `/api/submissions` | Save campaign bundle draft | Bearer Token (`CREATOR`) |
| `GET` | `/api/submissions/:id` | Fetch campaign detail with revisions, findings, comments | Bearer Token |
| `PATCH` | `/api/submissions/:id` | Update draft content or visual assets | Bearer Token (`CREATOR`) |
| `POST` | `/api/submissions/:id/submit` | Submit draft campaign to Review Queue | Bearer Token (`CREATOR`) |
| `POST` | `/api/submissions/:id/review` | Approve campaign or request changes | Bearer Token (`REVIEWER`, `MANAGER`) |
| `POST` | `/api/submissions/:id/comments` | Add threaded discussion comment | Bearer Token |
| `POST` | `/api/submissions/:id/override-requests` | Request an override on flagged findings | Bearer Token (`CREATOR`) |
| `POST` | `/api/submissions/:id/override-requests/:requestId/decision` | Approve or reject an override request | Bearer Token (`REVIEWER`, `MANAGER`) |
| `GET` | `/api/submissions/governance/override-insights` | Aggregate governance metrics and rule infractions | Bearer Token (`MANAGER`) |
| `GET` | `/api/submissions/passport/:passportId/verify` | Public cryptographic Release Passport integrity check | None (Public) |

---

## 14. Testing and Verification

All tests were executed directly in the repository environment using native Node.js and TypeScript test runners (`node --test`, `tsx --test`).

| Test Case | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- |
| **Frontend WCAG Contrast Algorithms** (`wcagContrast.test.mjs`) | Recommends nearest compliant swatch, handles missing targets, verifies large/normal thresholds, ignores invalid palette inputs | 5/5 tests passed | **PASSED** |
| **Backend WCAG Relative Luminance** (`wcag-contrast.test.ts`) | Matches WCAG reference relative luminance values, validates compliant pairs, recommends accessible foreground | 3/3 tests passed | **PASSED** |
| **PII Pattern Redaction & Masking** (`pii-masking.test.ts`) | Masks email, Indian phone, Aadhaar, PAN, and Luhn-valid credit cards; preserves marketing metrics; prevents placeholder collisions | 6/6 tests passed | **PASSED** |
| **Numeric Claims & Fact Matching** (`numeric-claims.test.ts`) | Extracts numbers while ignoring numeric PII fragments; flags unapproved statistics; matches approved fact claims | 3/3 tests passed | **PASSED** |
| **Release Passport Digest & Signature** (`release-passport.test.ts`) | Canonical JSON independent of key order; digest verifies issued snapshot; detects modified snapshots; binds HMAC to secret | 5/5 tests passed | **PASSED** |
| **Audit Receipt Hashing** (`audit-receipts.test.ts`) | Text hashes stable; unique unpredictable hex IDs; config hash reflects rules/facts independent of order; binds alt-text | 7/7 tests passed | **PASSED** |
| **Governance Insights Analytics** (`governance-insights.test.ts`) | Aggregates override reason categories; computes rule infraction rates; handles malformed decisions gracefully | 2/2 tests passed | **PASSED** |
| **Image-Text Contrast Sampling** (`image-text-contrast.test.ts`) | Evaluates solid text from sampled pixels; rejects low-contrast #8A8A8A on white; enforces large vs normal thresholds | 14/14 tests passed | **PASSED** |
| **Pixel Sampling & Halo Isolation** (`image-text-pixels.test.ts`) | Measures glyph and background colors; variable backgrounds fail closed; transparent pixels route to human review | 8/8 tests passed | **PASSED** |
| **Release Gate Validation** (`release-gate.test.ts`) | Missing alt-text is deterministic hard stop; warnings require override reason; informational findings pass automatically | 9/9 tests passed | **PASSED** |
| **Reviewer Decision Validation** (`review-validation.test.ts`) | Approvals accept optional note; change requests require >=10 characters; oversized notes rejected; trimmed updates validated | 5/5 tests passed | **PASSED** |
| **API End-to-End Integration Suite** (`api.integration.test.ts`) | Full HTTP route execution against database | Skipped *(requires dedicated `TEST_DATABASE_URL`)* | **NOT TESTED** |

**Summary: 67 Passed, 0 Failed, 1 Skipped.**

---

## 15. Limitations

1. **OCR Region Precision**: Visual text detection depends on clear contrast between text and background. Highly stylized, low-resolution, or cursive scripts may require manual bounding confirmation.
2. **Third-Party AI Dependency**: While deterministic regex rules and numeric claim verification operate 100% offline, semantic tone evaluation requires an active `GEMINI_API_KEY` and network access.
3. **Single Active Brand Profile**: The current deployment models multiple brands in the schema, but defaults to the primary seeded profile (`PahariKnits`) for demo evaluation.

---

## 16. Future Enhancements

- **Direct Ad Network Publishing**: Automatic pushing of approved campaigns directly to Meta Ads Manager, Google Ads, and LinkedIn Campaign Manager via OAuth integrations.
- **Multilingual Semantic Auditing**: Expanding deterministic fact matching to support Spanish, French, German, and Hindi marketing copy.
- **Video Preflight & Frame Inspection**: Sampling video keyframes with FFmpeg to verify WCAG contrast on on-screen subtitles and motion graphics.
- **Decentralized Passport Attestation**: Anchoring Release Passport hashes to public blockchain networks (e.g., Ethereum or Polygon) for third-party regulatory immutability.

---

## 17. Contribution Guidelines

1. **Fork the Repository**: Create your feature branch (`git checkout -b feature/governance-enhancement`).
2. **Adhere to Code Standards**: Ensure TypeScript strict mode compliance and ESLint checks pass.
3. **Execute Test Suites**:
   ```bash
   cd frontend && npm test
   cd ../backend && npm test
   ```
4. **Preserve API Contracts**: Never modify existing API response contracts without backwards compatibility.
5. **Submit a Pull Request**: Provide a detailed description of the problem solved, test evidence, and schema implications.

---

## 18. Disclaimer

Brand Shield AI is designed to assist brand managers, compliance officers, and creative teams in identifying potential regulatory infractions, factual discrepancies, and accessibility violations prior to publication. 

While the deterministic and AI models significantly reduce the risk of non-compliant advertising, the platform does not constitute formal legal counsel. Final advertising liability and regulatory compliance remain the sole responsibility of the publishing enterprise.
