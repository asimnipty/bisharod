import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export interface AuthUser {
  sub: string; // user id as string
  name: string;
  email: string;
  role: string;
  organizationId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing Bearer token" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as any;
    req.user = {
      sub: String(payload.sub),
      name: payload.name,
      email: payload.email,
      role: payload.role,
      organizationId: payload.org_id ?? "bisharod",
    };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
