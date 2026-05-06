import { Request, Response, NextFunction } from 'express'

type Permission =
  | 'read:fhir' | 'write:fhir' | 'run:cql'
  | 'author:measures' | 'manage:paauth'
  | 'view:caregaps' | 'admin:users'

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin:     ['read:fhir','write:fhir','run:cql','author:measures','manage:paauth','view:caregaps','admin:users'],
  clinician: ['read:fhir','write:fhir','manage:paauth','view:caregaps'],
  analyst:   ['read:fhir','run:cql','author:measures','view:caregaps'],
  viewer:    ['read:fhir','view:caregaps'],
}

export function authorize(...required: Permission[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role ?? 'viewer'
    const granted = ROLE_PERMISSIONS[role] ?? []
    const missing = required.filter(p => !granted.includes(p))
    if (missing.length > 0) {
      return res.status(403).json({ error: 'Insufficient permissions', missing, role })
    }
    next()
  }
}
