"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hl7Router = void 0;
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const authorize_1 = require("../middleware/authorize");
exports.hl7Router = (0, express_1.Router)();
exports.hl7Router.post('/v2/ingest', authenticate_1.authenticate, (0, authorize_1.authorize)('write:fhir'), async (req, res) => {
    const raw = typeof req.body === 'string' ? req.body : req.body?.message ?? '';
    if (!raw.startsWith('MSH')) {
        return res.status(400).json({ error: 'Not a valid HL7 v2 message (MSH segment missing)' });
    }
    // TODO: queue for HL7 → FHIR conversion
    res.status(202).json({ jobId: `job-${Date.now()}`, status: 'queued', message: 'HL7 v2 message received' });
});
exports.hl7Router.post('/v3/ingest', authenticate_1.authenticate, (0, authorize_1.authorize)('write:fhir'), async (req, res) => {
    const xml = req.body?.document ?? '';
    if (!xml.includes('ClinicalDocument')) {
        return res.status(400).json({ error: 'Not a valid C-CDA document' });
    }
    res.status(202).json({ jobId: `job-${Date.now()}`, status: 'queued', message: 'HL7 v3 document received' });
});
