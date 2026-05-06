import { Router } from 'express'
import { authenticate } from '../middleware/authenticate'
import { authorize }    from '../middleware/authorize'

export const hl7Router = Router()

hl7Router.post('/v2/ingest', authenticate, authorize('write:fhir'), async (req, res) => {
  const raw: string = typeof req.body === 'string' ? req.body : req.body?.message ?? ''
  if (!raw.startsWith('MSH')) {
    return res.status(400).json({ error: 'Not a valid HL7 v2 message (MSH segment missing)' })
  }
  // TODO: queue for HL7 → FHIR conversion
  res.status(202).json({ jobId: `job-${Date.now()}`, status: 'queued', message: 'HL7 v2 message received' })
})

hl7Router.post('/v3/ingest', authenticate, authorize('write:fhir'), async (req, res) => {
  const xml: string = req.body?.document ?? ''
  if (!xml.includes('ClinicalDocument')) {
    return res.status(400).json({ error: 'Not a valid C-CDA document' })
  }
  res.status(202).json({ jobId: `job-${Date.now()}`, status: 'queued', message: 'HL7 v3 document received' })
})
