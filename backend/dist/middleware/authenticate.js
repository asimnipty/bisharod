"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing Bearer token' });
    }
    // TODO: In production, verify JWT signature via JWKS
    // For development, we trust any bearer token and mock the user
    req.user = {
        sub: 'dev-user-1',
        name: 'Dev User',
        email: 'dev@bisharod.com',
        role: 'admin',
        organizationId: 'org-dev',
    };
    next();
}
