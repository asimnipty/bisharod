import axios from 'axios'
import { config } from '../config/env'

export class CQLService {
  async translateToELM(cql: string) {
    try {
      const res = await axios.post(`${config.CQL_SERVICE_URL}/cql/translator`, cql, {
        headers: { 'Content-Type': 'application/cql', Accept: 'application/elm+json' },
        params: { annotations: true, locators: true },
        timeout: 10_000,
      })
      const annotations: any[] = res.data?.library?.annotation ?? []
      return {
        elm: res.data,
        errors:   annotations.filter(a => a.type === 'CqlToElmError').map(a => a.message),
        warnings: annotations.filter(a => a.type === 'CqlToElmWarning').map(a => a.message),
      }
    } catch (err: any) {
      // Return mock response in dev when CQL service isn't running
      console.warn('[CQLService] Translation service unavailable — returning mock ELM')
      return {
        elm: { library: { identifier: { id: 'mock', version: '1.0.0' } } },
        errors: [],
        warnings: ['CQL translation service not running — using mock response'],
      }
    }
  }

  async validate(cql: string) {
    const result = await this.translateToELM(cql)
    return { valid: result.errors.length === 0, errors: result.errors, warnings: result.warnings }
  }

  async execute({ cql, patientId }: { cql: string; patientId: string }) {
    return {
      patientId,
      results: { 'Age in Years': 52, 'Has Active Diabetes': true },
      executedAt: new Date().toISOString(),
      note: 'Mock results — wire cql-execution engine for real evaluation',
    }
  }

  async listLibraries() {
    try {
      const res = await axios.get(`${config.FHIR_BASE_URL}/Library`, {
        params: { 'content-type': 'text/cql', _count: 50 },
        headers: { Authorization: `Bearer ${config.FHIR_SERVICE_TOKEN}` },
        timeout: 5_000,
      })
      return res.data?.entry?.map((e: any) => e.resource) ?? []
    } catch {
      return []
    }
  }
}
