/**
 * Auth Routes — SMART on FHIR OAuth 2.0 flow
 *
 * GET  /auth/login     → redirect to Keycloak authorization endpoint
 * GET  /auth/callback  → exchange code for tokens, issue session
 * POST /auth/logout    → invalidate session
 */
import { Router } from 'express'
import { config } from '../config/env'

export const authRouter = Router()

authRouter.get('/login', (_req, res) => {
  // In production: redirect to Keycloak SMART authorization endpoint
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: 'bisharod-ui',
    redirect_uri: 'http://localhost:5173/auth/callback',
    scope: 'openid profile fhirUser launch/patient',
  })
  res.redirect(`${config.JWKS_URI.replace('/certs', '/auth')}?${params}`)
})

authRouter.get('/callback', (req, res) => {
  // TODO: exchange code for token with Keycloak, set HTTP-only cookie
  res.json({ message: 'Auth callback — implement token exchange here', code: req.query.code })
})

authRouter.post('/logout', (_req, res) => {
  res.clearCookie('session')
  res.json({ message: 'Logged out' })
})
