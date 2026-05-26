import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { config } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { rateLimiter } from "./middleware/rateLimiter";
import { healthRouter } from "./routes/health";
import { authRouter } from "./routes/auth";
import { fhirProxyRouter } from "./routes/fhirProxy";
import { cqlRouter } from "./routes/cql";
import { measuresRouter } from "./routes/measures";
import { careGapRouter } from "./routes/careGaps";
import { priorAuthRouter } from "./routes/priorAuth";
import { hl7Router } from "./routes/hl7";
import blogRoutes from "./routes/blog";
// Blog API fix - new deployment
import "express-async-errors";

const app = express();

// ── Middleware (MUST come before routes) ──────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: config.CORS_ORIGINS, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: "text/plain", limit: "5mb" }));
app.use(morgan("dev"));
app.use(rateLimiter);

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/fhir", fhirProxyRouter);
app.use("/api/cql", cqlRouter);
app.use("/api/measures", measuresRouter);
app.use("/api/care-gaps", careGapRouter);
app.use("/api/prior-auth", priorAuthRouter);
app.use("/api/hl7", hl7Router);
app.use("/api/blog", blogRoutes); // ✅ Blog route registered here

// ── Serve React Frontend ──────────────────────────────────────────────────────
const frontendDist = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDist));

// All non-API routes serve React app (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// ── Error Handler (MUST come last) ────────────────────────────────────────────
app.use(errorHandler);

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(config.PORT, () =>
  console.log(`✅ Bisharod running on port ${config.PORT}`),
);

export default app;
