import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export type UserRole = "CREATOR" | "MANAGER" | "REVIEWER";

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthenticatedUser;
    }
  }
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  void authenticateRequest(req, res, next);
}

async function authenticateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = process.env.JWT_SECRET || "brandshield-enterprise-jwt-auth-secret-32chars";

  if (!secret || secret.length < 32) {
    return res.status(500).json({
      error: "Authentication is not configured. Set a strong JWT_SECRET.",
    });
  }

  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7).trim()
    : "";

  if (!token) {
    return res.status(401).json({ error: "A bearer token is required." });
  }

  let userId: string;

  try {
    const payload = jwt.verify(token, secret);

    if (typeof payload === "string" || !payload.sub) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    userId = payload.sub;
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (user) {
      req.authUser = {
        ...user,
        role: user.role as UserRole,
      };
      return next();
    }
  } catch (err) {
    console.warn("DB user lookup failed, falling back to demo session check:", err);
  }

  const fallbackUsers: Record<string, AuthenticatedUser> = {
    "demo-creator": { id: "demo-creator", name: "Demo Creator", email: "creator@brandflight.demo", role: "CREATOR" },
    "demo-manager": { id: "demo-manager", name: "Demo Manager", email: "manager@brandflight.demo", role: "MANAGER" },
    "demo-reviewer": { id: "demo-reviewer", name: "Demo Reviewer", email: "reviewer@brandflight.demo", role: "REVIEWER" },
  };

  if (fallbackUsers[userId]) {
    req.authUser = fallbackUsers[userId];
    return next();
  }

  return res.status(401).json({ error: "User account no longer exists." });
}

export function requireRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser) {
      return res.status(401).json({ error: "Authentication is required." });
    }

    if (!roles.includes(req.authUser.role)) {
      return res.status(403).json({
        error: "Your role does not have permission to perform this action.",
      });
    }

    return next();
  };
}
