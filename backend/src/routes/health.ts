import { Router } from 'express'
export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'bisharod-api', ts: new Date().toISOString() })
})
