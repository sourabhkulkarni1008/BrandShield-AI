import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { createFallbackPrismaClient } from "./in-memory-db.js";

const isPlaceholderHost =
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.includes("HOST") ||
  process.env.DATABASE_URL.trim() === "";

let realPrisma: any = null;
if (!isPlaceholderHost) {
  try {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    realPrisma = new PrismaClient({ adapter });
  } catch (err) {
    console.warn("[DATABASE] Failed to initialize Prisma adapter with DATABASE_URL:", err);
  }
}

const fallbackClient = createFallbackPrismaClient();
export let isDatabaseFallbackActive = isPlaceholderHost || !realPrisma;

export function getDatabaseStatus(): string {
  if (isDatabaseFallbackActive) {
    return isPlaceholderHost
      ? "resilient_in_memory_store (DATABASE_URL unset or placeholder HOST)"
      : "resilient_in_memory_store (PostgreSQL offline or unreachable)";
  }
  return "connected";
}

// Proxied prisma client that transparently falls back to in-memory store when PostgreSQL is unreachable
export const prisma: PrismaClient = new Proxy(fallbackClient, {
  get(target: any, prop: string | symbol) {
    if (prop === "$isFallbackActive") {
      return isDatabaseFallbackActive;
    }
    if (isDatabaseFallbackActive || !realPrisma) {
      return (target as any)[prop];
    }
    const realProp = (realPrisma as any)[prop];
    if (typeof realProp === "function") {
      return async (...args: any[]) => {
        try {
          return await realProp.apply(realPrisma, args);
        } catch (err: any) {
          const errMsg = err?.message || String(err);
          if (
            errMsg.includes("Can't reach database server") ||
            errMsg.includes("connect ECONNREFUSED") ||
            errMsg.includes("Invalid `prisma.$queryRaw()`") ||
            errMsg.includes("N/A") ||
            errMsg.includes("ETIMEDOUT")
          ) {
            console.warn(`[DATABASE] PostgreSQL unreachable (${errMsg}). Switching to resilient in-memory store.`);
            isDatabaseFallbackActive = true;
            const fallbackProp = (target as any)[prop];
            return typeof fallbackProp === "function" ? fallbackProp.apply(target, args) : fallbackProp;
          }
          throw err;
        }
      };
    }
    if (typeof realProp === "object" && realProp !== null) {
      return new Proxy(realProp, {
        get(modelTarget: any, modelProp: string | symbol) {
          if (isDatabaseFallbackActive) {
            return (target as any)[prop]?.[modelProp];
          }
          const realMethod = modelTarget[modelProp];
          if (typeof realMethod === "function") {
            return async (...args: any[]) => {
              try {
                return await realMethod.apply(modelTarget, args);
              } catch (err: any) {
                const errMsg = err?.message || String(err);
                if (
                  errMsg.includes("Can't reach database server") ||
                  errMsg.includes("connect ECONNREFUSED") ||
                  errMsg.includes("Invalid `prisma.") ||
                  errMsg.includes("N/A") ||
                  errMsg.includes("ETIMEDOUT")
                ) {
                  console.warn(
                    `[DATABASE] PostgreSQL unreachable during ${String(prop)}.${String(modelProp)} (${errMsg}). Switching to resilient in-memory store.`,
                  );
                  isDatabaseFallbackActive = true;
                  const fallbackMethod = (target as any)[prop]?.[modelProp];
                  return typeof fallbackMethod === "function"
                    ? fallbackMethod.apply((target as any)[prop], args)
                    : fallbackMethod;
                }
                throw err;
              }
            };
          }
          return realMethod;
        },
      });
    }
    return realProp;
  },
}) as unknown as PrismaClient;
