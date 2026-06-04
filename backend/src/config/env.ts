import dotenv from "dotenv";
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),

  FHIR_BASE_URL: process.env.FHIR_BASE_URL ?? "http://localhost:8080/fhir",
  FHIR_SERVICE_TOKEN: process.env.FHIR_SERVICE_TOKEN ?? "dev-token",
  CQL_SERVICE_URL: process.env.CQL_SERVICE_URL ?? "http://localhost:8090",

  JWKS_URI:
    process.env.JWKS_URI ??
    "http://localhost:8180/realms/bisharod/protocol/openid-connect/certs",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? "bisharod-api",
  JWT_SECRET:
    process.env.JWT_SECRET ?? "bisharod-dev-secret-change-in-production",

  DATABASE_URL:
    process.env.DATABASE_URL ??
    "postgresql://bisharod:bisharod@localhost:5432/bisharod",
  REDIS_URL: process.env.REDIS_URL ?? "redis://localhost:6379",

  CORS_ORIGINS: (
    process.env.CORS_ORIGINS ?? "http://localhost:5173,https://bisharod.com"
  ).split(","),
};
