"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fhirProxyRouter = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const authenticate_1 = require("../middleware/authenticate");
const env_1 = require("../config/env");
exports.fhirProxyRouter = (0, express_1.Router)();
exports.fhirProxyRouter.use(authenticate_1.authenticate);
exports.fhirProxyRouter.all('/*', async (req, res) => {
    try {
        const upstream = await (0, axios_1.default)({
            method: req.method,
            url: `${env_1.config.FHIR_BASE_URL}${req.path}`,
            params: req.query,
            data: req.body,
            headers: {
                'Content-Type': 'application/fhir+json',
                Accept: 'application/fhir+json',
                Authorization: `Bearer ${env_1.config.FHIR_SERVICE_TOKEN}`,
            },
            validateStatus: () => true,
            timeout: 10000,
        });
        res.status(upstream.status).json(upstream.data);
    }
    catch (err) {
        res.status(502).json({ error: 'FHIR server unavailable', detail: 'Is HAPI FHIR running on :8080?' });
    }
});
