"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const ROLE_PERMISSIONS = {
    admin: ['read:fhir', 'write:fhir', 'run:cql', 'author:measures', 'manage:paauth', 'view:caregaps', 'admin:users'],
    clinician: ['read:fhir', 'write:fhir', 'manage:paauth', 'view:caregaps'],
    analyst: ['read:fhir', 'run:cql', 'author:measures', 'view:caregaps'],
    viewer: ['read:fhir', 'view:caregaps'],
};
function authorize(...required) {
    return (req, res, next) => {
        const role = req.user?.role ?? 'viewer';
        const granted = ROLE_PERMISSIONS[role] ?? [];
        const missing = required.filter(p => !granted.includes(p));
        if (missing.length > 0) {
            return res.status(403).json({ error: 'Insufficient permissions', missing, role });
        }
        next();
    };
}
