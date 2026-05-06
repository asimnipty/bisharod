import { Request, Response, NextFunction } from 'express'

// Simple in-memory rate limiter (use express-rate-limit in production)
const store = new Map<string, { count: number; reset: number }>()

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const key = req.ip ?? 'unknown'
  const now = Date.now()
  const window = 60_000  // 1 min
  const limit = 300

  const entry = store.get(key)
  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + window })
    return next()
  }
  entry.count++
  if (entry.count > limit) {
    return res.status(429).json({ error: 'Too many requests' })
  }
  next()
}
