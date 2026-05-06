# Bisharod — FHIR Health Data Platform

Digital health data services built on FHIR, CQL, and HL7 standards.

---

## 🚀 Run in VS Code (Quick Start)

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Open in VS Code
```bash
code bisharod
```

### 2. Install dependencies

Open two terminals in VS Code (`Ctrl+` ` ` ` then split):

**Terminal 1 — Frontend**
```bash
cd frontend
npm install
npm run dev
```
→ Opens on **http://localhost:5173**

**Terminal 2 — Backend**
```bash
cd backend
npm install
npm run dev
```
→ API runs on **http://localhost:4000**

### 3. Open browser
Visit **http://localhost:5173**

- Home page loads immediately
- Click **Services** to browse all FHIR/CQL services
- Click **Sign In** → enter any email + password → you're in the portal
- Explore **Portal** modules: CQL Authoring, Care Gaps, Measures, Prior Auth

---

## Project Structure

```
bisharod/
├── frontend/                    React 18 + TypeScript + Tailwind + Vite
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── api/
│   │   │   └── fhirClient.ts    FHIR REST client (axios)
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx
│   │   │       ├── MainLayout.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── PortalPage.tsx
│   │   │   ├── CQLPage.tsx
│   │   │   ├── CareGapPage.tsx
│   │   │   ├── MeasuresPage.tsx
│   │   │   ├── PriorAuthPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── store/
│   │   │   └── authStore.ts     Zustand (auth state)
│   │   └── styles/
│   │       └── globals.css      Tailwind + Google Fonts
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                     Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts           Typed env vars
│   │   ├── middleware/
│   │   │   ├── authenticate.ts  Bearer token (dev: mock, prod: JWT/JWKS)
│   │   │   ├── authorize.ts     RBAC permissions
│   │   │   ├── validateBody.ts  Zod schema validation
│   │   │   ├── rateLimiter.ts   Simple rate limiting
│   │   │   └── errorHandler.ts  Global error handler
│   │   ├── routes/
│   │   │   ├── health.ts        GET /health
│   │   │   ├── auth.ts          GET /auth/login, /auth/callback
│   │   │   ├── fhirProxy.ts     /fhir/* → HAPI FHIR server
│   │   │   ├── cql.ts           /api/cql/translate|validate|execute
│   │   │   ├── measures.ts      /api/measures
│   │   │   ├── careGaps.ts      /api/care-gaps
│   │   │   ├── priorAuth.ts     /api/prior-auth
│   │   │   └── hl7.ts           /api/hl7/v2|v3/ingest
│   │   ├── services/
│   │   │   └── cqlService.ts    CQL translate/execute logic
│   │   └── index.ts             Entry point
│   ├── .env                     Local env (copy of .env.example)
│   ├── .env.example             Template
│   └── tsconfig.json
│
└── docker-compose.yml           HAPI FHIR + Keycloak + PostgreSQL + Redis
```

---

## Optional: Full Stack with Docker

If you want HAPI FHIR, Keycloak, PostgreSQL, and Redis:

```bash
docker-compose up -d
```

Then run frontend + backend as above. The backend will connect to HAPI FHIR on port 8080.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| State | Zustand, React Query |
| Backend | Node.js, Express, TypeScript |
| Auth | SMART on FHIR (OAuth 2.0), Keycloak |
| FHIR | HAPI FHIR R4 |
| CQL | CQL Translation Service |
| Infra | Docker Compose |
