"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CQLService = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
class CQLService {
    async translateToELM(cql) {
        try {
            const res = await axios_1.default.post(`${env_1.config.CQL_SERVICE_URL}/cql/translator`, cql, {
                headers: { 'Content-Type': 'application/cql', Accept: 'application/elm+json' },
                params: { annotations: true, locators: true },
                timeout: 10000,
            });
            const annotations = res.data?.library?.annotation ?? [];
            return {
                elm: res.data,
                errors: annotations.filter(a => a.type === 'CqlToElmError').map(a => a.message),
                warnings: annotations.filter(a => a.type === 'CqlToElmWarning').map(a => a.message),
            };
        }
        catch (err) {
            // Return mock response in dev when CQL service isn't running
            console.warn('[CQLService] Translation service unavailable — returning mock ELM');
            return {
                elm: { library: { identifier: { id: 'mock', version: '1.0.0' } } },
                errors: [],
                warnings: ['CQL translation service not running — using mock response'],
            };
        }
    }
    async validate(cql) {
        const result = await this.translateToELM(cql);
        return { valid: result.errors.length === 0, errors: result.errors, warnings: result.warnings };
    }
    async execute({ cql, patientId }) {
        return {
            patientId,
            results: { 'Age in Years': 52, 'Has Active Diabetes': true },
            executedAt: new Date().toISOString(),
            note: 'Mock results — wire cql-execution engine for real evaluation',
        };
    }
    async listLibraries() {
        try {
            const res = await axios_1.default.get(`${env_1.config.FHIR_BASE_URL}/Library`, {
                params: { 'content-type': 'text/cql', _count: 50 },
                headers: { Authorization: `Bearer ${env_1.config.FHIR_SERVICE_TOKEN}` },
                timeout: 5000,
            });
            return res.data?.entry?.map((e) => e.resource) ?? [];
        }
        catch {
            return [];
        }
    }
}
exports.CQLService = CQLService;
