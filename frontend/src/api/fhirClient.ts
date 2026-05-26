import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

// Main API client pointing to Render backend
export const apiClient = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token to every request
apiClient.interceptors.request.use((config) => {
  const auth = localStorage.getItem("bisharod-auth");
  if (auth) {
    try {
      const { state } = JSON.parse(auth);
      if (state?.user) {
        config.headers.Authorization = `Bearer dev-token`;
      }
    } catch {}
  }
  return config;
});

// FHIR specific client
const fhirClient = axios.create({
  baseURL: `${BASE}/fhir`,
  headers: { "Content-Type": "application/fhir+json" },
});

fhirClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer dev-token`;
  return config;
});

export const fhirApi = {
  read: <T>(resourceType: string, id: string) =>
    fhirClient.get<T>(`/${resourceType}/${id}`).then((r) => r.data),

  search: <T>(resourceType: string, params: Record<string, string>) =>
    fhirClient.get<T>(`/${resourceType}`, { params }).then((r) => r.data),

  create: <T>(resourceType: string, body: unknown) =>
    fhirClient.post<T>(`/${resourceType}`, body).then((r) => r.data),

  evaluateMeasure: (id: string, params: Record<string, string>) =>
    fhirClient
      .post(`/Measure/${id}/$evaluate-measure`, null, { params })
      .then((r) => r.data),

  careGaps: (params: Record<string, string>) =>
    fhirClient
      .post("/Measure/$care-gaps", null, { params })
      .then((r) => r.data),
};

// CQL API
export const cqlApi = {
  translate: (cql: string) =>
    apiClient.post("/api/cql/translate", { cql }).then((r) => r.data),

  validate: (cql: string) =>
    apiClient.post("/api/cql/validate", { cql }).then((r) => r.data),

  execute: (cql: string, patientId: string) =>
    apiClient.post("/api/cql/execute", { cql, patientId }).then((r) => r.data),

  listLibraries: () => apiClient.get("/api/cql/libraries").then((r) => r.data),
};

// Care Gaps API
export const careGapApi = {
  run: (params: { periodStart: string; periodEnd: string; topic: string }) =>
    apiClient.post("/api/care-gaps", params).then((r) => r.data),
};

// Prior Auth API
export const priorAuthApi = {
  submit: (data: { patientId: string; requestorId: string; urgency: string }) =>
    apiClient.post("/api/prior-auth/submit", data).then((r) => r.data),

  getPending: () =>
    apiClient.get("/api/prior-auth/pending").then((r) => r.data),

  getStatus: (id: string) =>
    apiClient.get(`/api/prior-auth/${id}`).then((r) => r.data),
};

// Health check
export const healthApi = {
  check: () => apiClient.get("/health").then((r) => r.data),
};

// Blog API
export const blogApi = {
  getPosts: () => apiClient.get("/api/blog").then((r) => r.data),

  getPost: (id: string) => apiClient.get(`/api/blog/${id}`).then((r) => r.data),

  createPost: (data: { title: string; content: string; author: string }) =>
    apiClient.post("/api/blog", data).then((r) => r.data),

  updatePost: (id: string, data: unknown) =>
    apiClient.put(`/api/blog/${id}`, data).then((r) => r.data),

  deletePost: (id: string) =>
    apiClient.delete(`/api/blog/${id}`).then((r) => r.data),
};
