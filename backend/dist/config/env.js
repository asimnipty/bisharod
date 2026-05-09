"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: Number(process.env.PORT ?? 4000),
    FHIR_BASE_URL: process.env.FHIR_BASE_URL ?? 'http://localhost:8080/fhir',
    FHIR_SERVICE_TOKEN: process.env.FHIR_SERVICE_TOKEN ?? 'dev-token',
    CQL_SERVICE_URL: process.env.CQL_SERVICE_URL ?? 'http://localhost:8090',
    JWKS_URI: process.env.JWKS_URI ?? 'http://localhost:8180/realms/bisharod/protocol/openid-connect/certs',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? 'bisharod-api',
    DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://bisharod:bisharod@localhost:5432/bisharod',
    REDIS_URL: process.env.REDIS_URL ?? 'redis://localhost:6379',
    CORS_ORIGINS: (process.env.CORS_ORIGINS ?? 'http://localhost:5173').split(','),
};
