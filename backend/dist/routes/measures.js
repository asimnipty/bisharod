"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.careGapRouter = exports.measuresRouter = void 0;
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const authorize_1 = require("../middleware/authorize");
// ── Quality Measures ─────────────────────────────────────────────────────────
exports.measuresRouter = (0, express_1.Router)();
exports.measuresRouter.get('/', authenticate_1.authenticate, (0, authorize_1.authorize)('read:fhir'), async (req, res) => {
    // TODO: fetch Measure resources from FHIR server
    res.json({ measures: [], total: 0 });
});
exports.measuresRouter.post('/:id/evaluate', authenticate_1.authenticate, (0, authorize_1.authorize)('run:cql'), async (req, res) => {
    // TODO: POST /fhir/Measure/:id/$evaluate-measure
    res.json({ resourceType: 'MeasureReport', status: 'complete', measure: req.params.id });
});
// ── Care Gaps ────────────────────────────────────────────────────────────────
exports.careGapRouter = (0, express_1.Router)();
exports.careGapRouter.post('/', authenticate_1.authenticate, (0, authorize_1.authorize)('view:caregaps'), async (req, res) => {
    // TODO: POST /fhir/Measure/$care-gaps with period + topic params
    const { periodStart, periodEnd, topic } = req.body;
    res.json({ periodStart, periodEnd, topic, gaps: [] });
});
