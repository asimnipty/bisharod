"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priorAuthRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const authenticate_1 = require("../middleware/authenticate");
const authorize_1 = require("../middleware/authorize");
const validateBody_1 = require("../middleware/validateBody");
exports.priorAuthRouter = (0, express_1.Router)();
exports.priorAuthRouter.post('/submit', authenticate_1.authenticate, (0, authorize_1.authorize)('manage:paauth'), (0, validateBody_1.validateBody)(zod_1.z.object({
    patientId: zod_1.z.string(),
    requestorId: zod_1.z.string(),
    urgency: zod_1.z.enum(['routine', 'urgent', 'stat']).default('routine'),
    claimBundle: zod_1.z.record(zod_1.z.unknown()).optional(),
})), async (req, res) => {
    res.status(202).json({
        id: `pa-${Date.now()}`,
        status: 'pending',
        ...req.body,
        submittedAt: new Date().toISOString(),
    });
});
exports.priorAuthRouter.get('/pending', authenticate_1.authenticate, (0, authorize_1.authorize)('manage:paauth'), async (req, res) => {
    res.json({ pending: [], organizationId: req.user?.organizationId });
});
exports.priorAuthRouter.get('/:id', authenticate_1.authenticate, (0, authorize_1.authorize)('manage:paauth'), async (req, res) => {
    res.json({ id: req.params.id, status: 'pending', updatedAt: new Date().toISOString() });
});
