"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const health_1 = require("./routes/health");
const auth_1 = require("./routes/auth");
const fhirProxy_1 = require("./routes/fhirProxy");
const cql_1 = require("./routes/cql");
const measures_1 = require("./routes/measures");
const careGaps_1 = require("./routes/careGaps");
const priorAuth_1 = require("./routes/priorAuth");
const hl7_1 = require("./routes/hl7");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
app.use((0, cors_1.default)({ origin: env_1.config.CORS_ORIGINS, credentials: true }));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.text({ type: "text/plain", limit: "5mb" }));
app.use((0, morgan_1.default)("dev"));
app.use(rateLimiter_1.rateLimiter);
// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/health", health_1.healthRouter);
app.use("/auth", auth_1.authRouter);
app.use("/fhir", fhirProxy_1.fhirProxyRouter);
app.use("/api/cql", cql_1.cqlRouter);
app.use("/api/measures", measures_1.measuresRouter);
app.use("/api/care-gaps", careGaps_1.careGapRouter);
app.use("/api/prior-auth", priorAuth_1.priorAuthRouter);
app.use("/api/hl7", hl7_1.hl7Router);
// ── Serve React Frontend ──────────────────────────────────────────────────────
const frontendDist = path_1.default.join(__dirname, "../../frontend/dist");
app.use(express_1.default.static(frontendDist));
// All non-API routes serve React app (SPA routing)
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(frontendDist, "index.html"));
});
app.use(errorHandler_1.errorHandler);
app.listen(env_1.config.PORT, () => console.log(`✅ Bisharod running on port ${env_1.config.PORT}`));
exports.default = app;
