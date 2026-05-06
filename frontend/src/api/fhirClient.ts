import axios from 'axios'

const BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:4000'

const fhirClient = axios.create({ baseURL: `${BASE}/fhir` })

export const fhirApi = {
  read: <T>(resourceType: string, id: string) =>
    fhirClient.get<T>(`/${resourceType}/${id}`).then(r => r.data),

  search: <T>(resourceType: string, params: Record<string, string>) =>
    fhirClient.get<T>(`/${resourceType}`, { params }).then(r => r.data),

  create: <T>(resourceType: string, body: unknown) =>
    fhirClient.post<T>(`/${resourceType}`, body).then(r => r.data),

  update: <T>(resourceType: string, id: string, body: unknown) =>
    fhirClient.put<T>(`/${resourceType}/${id}`, body).then(r => r.data),

  evaluateMeasure: (id: string, params: Record<string, string>) =>
    fhirClient.post(`/Measure/${id}/$evaluate-measure`, null, { params }).then(r => r.data),

  careGaps: (params: Record<string, string>) =>
    fhirClient.post('/Measure/$care-gaps', null, { params }).then(r => r.data),
}
