"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = rateLimiter;
// Simple in-memory rate limiter (use express-rate-limit in production)
const store = new Map();
function rateLimiter(req, res, next) {
    const key = req.ip ?? 'unknown';
    const now = Date.now();
    const window = 60000; // 1 min
    const limit = 300;
    const entry = store.get(key);
    if (!entry || now > entry.reset) {
        store.set(key, { count: 1, reset: now + window });
        return next();
    }
    entry.count++;
    if (entry.count > limit) {
        return res.status(429).json({ error: 'Too many requests' });
    }
    next();
}
