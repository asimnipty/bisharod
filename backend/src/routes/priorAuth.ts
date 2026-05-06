import { Router } from 'express'
import { z } from 'zod'
import { authenticate } from '../middleware/authenticate'
import { authorize }    from '../middleware/authorize'
import { validateBody } from '../middleware/validateBody'

export const priorAuthRouter = Router()

priorAuthRouter.post('/submit',
  authenticate, authorize('manage:paauth'),
  validateBody(z.object({
    patientId:   z.string(),
    requestorId: z.string(),
    urgency:     z.enum(['routine', 'urgent', 'stat']).default('routine'),
    claimBundle: z.record(z.unknown()).optional(),
  })),
  async (req, res) => {
    res.status(202).json({
      id: `pa-${Date.now()}`,
      status: 'pending',
      ...req.body,
      submittedAt: new Date().toISOString(),
    })
  }
)

priorAuthRouter.get('/pending', authenticate, authorize('manage:paauth'), async (req, res) => {
  res.json({ pending: [], organizationId: req.user?.organizationId })
})

priorAuthRouter.get('/:id', authenticate, authorize('manage:paauth'), async (req, res) => {
  res.json({ id: req.params.id, status: 'pending', updatedAt: new Date().toISOString() })
})
