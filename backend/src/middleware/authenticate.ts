import { Request, Response, NextFunction } from 'express'

// In dev mode: accept any Bearer token and attach a mock user
// In production: replace with real JWKS/JWT validation

export interface AuthUser {
  sub: string
  name: string
  email: string
  role: string
  organizationId: string
}

declare global {
  namespace Express {
    interface Request { user?: AuthUser }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Bearer token' })
  }

  // TODO: In production, verify JWT signature via JWKS
  // For development, we trust any bearer token and mock the user
  req.user = {
    sub: 'dev-user-1',
    name: 'Dev User',
    email: 'dev@bisharod.com',
    role: 'admin',
    organizationId: 'org-dev',
  }
  next()
}
