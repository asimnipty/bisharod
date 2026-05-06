import { Router } from 'express'
import { authenticate } from '../middleware/authenticate'
import { authorize }    from '../middleware/authorize'

export const careGapRouter = Router()

careGapRouter.post('/', authenticate, authorize('view:caregaps'), async (req, res) => {
  const { periodStart, periodEnd, topic } = req.body
  // TODO: call FHIR $care-gaps operation
  res.json({ periodStart, periodEnd, topic, gaps: [] })
})
