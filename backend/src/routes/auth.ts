import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";
import { config } from "../config/env";

export const authRouter = Router();

// ── POST /auth/register ───────────────────────────────────────────────────────
authRouter.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email and password are required" });
  }

  const hash = await bcrypt.hash(password, 10);
  const allowedRole = ["admin", "clinician", "analyst", "viewer"].includes(role)
    ? role
    : "viewer";

  try {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, org_id`,
      [name, email, hash, allowedRole],
    );
    const user = result.rows[0];
    const token = jwt.sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        org_id: user.org_id,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res
      .status(201)
      .json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already registered" });
    }
    throw err;
  }
});

// ── POST /auth/login ──────────────────────────────────────────────────────────
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const result = await pool.query(
    `SELECT id, name, email, password, role, org_id FROM users WHERE email = $1`,
    [email],
  );

  const user = result.rows[0];
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      org_id: user.org_id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// ── GET /auth/me ──────────────────────────────────────────────────────────────
authRouter.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }
  try {
    const payload = jwt.verify(authHeader.slice(7), config.JWT_SECRET) as any;
    res.json({
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// ── POST /auth/logout ─────────────────────────────────────────────────────────
authRouter.post("/logout", (_req, res) => {
  // JWT is stateless — client just drops the token
  res.json({ message: "Logged out" });
});
