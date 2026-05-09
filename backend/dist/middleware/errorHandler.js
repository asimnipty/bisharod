"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    const status = err.status ?? err.statusCode ?? 500;
    console.error(`[Error] ${err.message}`);
    res.status(status).json({
        error: err.message ?? 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
