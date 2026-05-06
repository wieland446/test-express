import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import { elementRouter } from "./src/routes/elements.routes.js";
import handleServerErrors from "./src/middlewares/handleServerErrors.js";
import { handleUserErrors } from "./src/middlewares/handleUserErrors.js";
import { blockRouter } from "./src/routes/blocks.routes.js";
import { groupRouter } from "./src/routes/groups.routes.js";
import { periodRouter } from "./src/routes/periods.routes.js";
import { closePool } from "./src/databases/pool.postgres.js";
import { logger } from "./src/helpers/logger.js";

const REQUIRED_ENV = [
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
  "CORS_ORIGIN",
] as const;

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    logger.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const PORT = Number(process.env.PORT ?? 3000);
const CORS_ORIGIN = process.env.CORS_ORIGIN as string;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// MIDDLEWARES
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// HEALTH CHECK
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ROUTES
app.use("/elements", elementRouter);
app.use("/blocks", blockRouter);
app.use("/groups", groupRouter);
app.use("/periods", periodRouter);

// SPECIFIC ROUTES ERROR HANDLING
app.use(handleUserErrors);

// GLOBAL ERROR HANDLING
app.use(handleServerErrors);

const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});

async function shutdown(signal: string): Promise<void> {
  logger.info(`${signal} received, shutting down`);
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
