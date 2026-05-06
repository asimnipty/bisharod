import { Router, Request, Response } from 'express'
import axios from 'axios'
import { authenticate } from '../middleware/authenticate'
import { config } from '../config/env'

export const fhirProxyRouter = Router()

fhirProxyRouter.use(authenticate)

fhirProxyRouter.all('/*', async (req: Request, res: Response) => {
  try {
    const upstream = await axios({
      method: req.method as any,
      url: `${config.FHIR_BASE_URL}${req.path}`,
      params: req.query,
      data: req.body,
      headers: {
        'Content-Type': 'application/fhir+json',
        Accept: 'application/fhir+json',
        Authorization: `Bearer ${config.FHIR_SERVICE_TOKEN}`,
      },
      validateStatus: () => true,
      timeout: 10_000,
    })
    res.status(upstream.status).json(upstream.data)
  } catch (err) {
    res.status(502).json({ error: 'FHIR server unavailable', detail: 'Is HAPI FHIR running on :8080?' })
  }
})
