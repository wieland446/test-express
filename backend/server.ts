import path from "node:path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";
import { elementRouter } from "./src/routes/elements.routes.js";
import handleServerErrors from "./src/middlewares/handleServerErrors.js";
import { handleUserErrors } from "./src/middlewares/handleUserErrors.js";
import { closePool, getPostgresPool } from "./src/databases/pool.postgres.js";
import { statusCodes } from "./src/helpers/statusCodes.js";
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

try {
  new URL(CORS_ORIGIN);
} catch {
  logger.error(`Invalid CORS_ORIGIN URL: ${CORS_ORIGIN}`);
  process.exit(1);
}

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skip: (req) => req.path === "/health",
  handler: (_req, res) => {
    res.status(statusCodes.tooManyRequests).json({ message: "Too many requests, please try again later" });
  },
});

// MIDDLEWARES
app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(limiter);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((_req, res, next) => {
  res.locals.requestId = uuidv4();
  next();
});

// Redirect HTTP → HTTPS behind a reverse proxy in production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      return res.redirect(`https://${req.header("host")}${req.url}`);
    }
    next();
  });
}

// HEALTH CHECK
app.get("/health", async (_req, res) => {
  try {
    await getPostgresPool().query("SELECT 1");
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "error", message: "Database unreachable" });
  }
});

// ROUTES
app.use("/elements", elementRouter);

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
