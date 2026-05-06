import { Router } from 'express'
import { z } from 'zod'
import { authenticate } from '../middleware/authenticate'
import { authorize }    from '../middleware/authorize'
import { validateBody } from '../middleware/validateBody'
import { CQLService }   from '../services/cqlService'

export const cqlRouter = Router()
const svc = new CQLService()

cqlRouter.post('/translate',
  authenticate, authorize('run:cql'),
  validateBody(z.object({ cql: z.string().min(1) })),
  async (req, res) => res.json(await svc.translateToELM(req.body.cql))
)

cqlRouter.post('/validate',
  authenticate, authorize('run:cql'),
  validateBody(z.object({ cql: z.string().min(1) })),
  async (req, res) => res.json(await svc.validate(req.body.cql))
)

cqlRouter.post('/execute',
  authenticate, authorize('run:cql'),
  validateBody(z.object({ cql: z.string().min(1), patientId: z.string() })),
  async (req, res) => res.json(await svc.execute(req.body))
)

cqlRouter.get('/libraries',
  authenticate, authorize('read:fhir'),
  async (_req, res) => res.json(await svc.listLibraries())
)
