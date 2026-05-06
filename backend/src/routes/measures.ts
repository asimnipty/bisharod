import { Router } from 'express'
import { authenticate } from '../middleware/authenticate'
import { authorize }    from '../middleware/authorize'

// ── Quality Measures ─────────────────────────────────────────────────────────
export const measuresRouter = Router()

measuresRouter.get('/', authenticate, authorize('read:fhir'), async (req, res) => {
  // TODO: fetch Measure resources from FHIR server
  res.json({ measures: [], total: 0 })
})

measuresRouter.post('/:id/evaluate', authenticate, authorize('run:cql'), async (req, res) => {
  // TODO: POST /fhir/Measure/:id/$evaluate-measure
  res.json({ resourceType: 'MeasureReport', status: 'complete', measure: req.params.id })
})

// ── Care Gaps ────────────────────────────────────────────────────────────────
export const careGapRouter = Router()

careGapRouter.post('/', authenticate, authorize('view:caregaps'), async (req, res) => {
  // TODO: POST /fhir/Measure/$care-gaps with period + topic params
  const { periodStart, periodEnd, topic } = req.body
  res.json({ periodStart, periodEnd, topic, gaps: [] })
})
