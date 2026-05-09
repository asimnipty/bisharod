"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.careGapRouter = void 0;
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const authorize_1 = require("../middleware/authorize");
exports.careGapRouter = (0, express_1.Router)();
exports.careGapRouter.post('/', authenticate_1.authenticate, (0, authorize_1.authorize)('view:caregaps'), async (req, res) => {
    const { periodStart, periodEnd, topic } = req.body;
    // TODO: call FHIR $care-gaps operation
    res.json({ periodStart, periodEnd, topic, gaps: [] });
});
