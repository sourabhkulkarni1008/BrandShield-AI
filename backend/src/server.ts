import { execSync } from "node:child_process";
import { app } from "./index.js";

const port = Number(process.env.PORT ?? 3000);

async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    console.warn("⚠️ DATABASE_URL is not set. Database operations will wait for configuration.");
    return;
  }

  try {
    console.log("🔄 Applying database migrations...");
    execSync("npx prisma migrate deploy --config prisma7.config.ts", {
      stdio: "inherit",
      env: process.env,
    });
    console.log("✅ Database migrations applied successfully.");
  } catch (err: any) {
    console.warn("Notice during prisma migrate deploy:", err?.message || err);
  }

  try {
    console.log("🔄 Seeding demo accounts and brand profile...");
    execSync("npx tsx prisma/seed.ts", {
      stdio: "inherit",
      env: {
        ...process.env,
        DEMO_CREATOR_PASSWORD: process.env.DEMO_CREATOR_PASSWORD || "BrandShield2026!Creator",
        DEMO_MANAGER_PASSWORD: process.env.DEMO_MANAGER_PASSWORD || "BrandShield2026!Manager",
        DEMO_REVIEWER_PASSWORD: process.env.DEMO_REVIEWER_PASSWORD || "BrandShield2026!Reviewer",
      },
    });
    console.log("✅ Database seed completed.");
  } catch (err: any) {
    console.warn("Notice during prisma seed:", err?.message || err);
  }
}

initDatabase().finally(() => {
  app.listen(port, () => {
    console.log(`BrandShield AI API running on port ${port}`);
  });
});