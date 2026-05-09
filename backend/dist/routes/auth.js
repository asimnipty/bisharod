"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
/**
 * Auth Routes — SMART on FHIR OAuth 2.0 flow
 *
 * GET  /auth/login     → redirect to Keycloak authorization endpoint
 * GET  /auth/callback  → exchange code for tokens, issue session
 * POST /auth/logout    → invalidate session
 */
const express_1 = require("express");
const env_1 = require("../config/env");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.get('/login', (_req, res) => {
    // In production: redirect to Keycloak SMART authorization endpoint
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: 'bisharod-ui',
        redirect_uri: 'http://localhost:5173/auth/callback',
        scope: 'openid profile fhirUser launch/patient',
    });
    res.redirect(`${env_1.config.JWKS_URI.replace('/certs', '/auth')}?${params}`);
});
exports.authRouter.get('/callback', (req, res) => {
    // TODO: exchange code for token with Keycloak, set HTTP-only cookie
    res.json({ message: 'Auth callback — implement token exchange here', code: req.query.code });
});
exports.authRouter.post('/logout', (_req, res) => {
    res.clearCookie('session');
    res.json({ message: 'Logged out' });
});
