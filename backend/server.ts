import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./src/routes/users.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { elementRouter } from "./src/routes/elements.routes.js";
import handleServerErrors from "./src/middlewares/handleServerErrors.js";
import { handleUserErrors } from "./src/middlewares/handleUserErrors.js";
import { blockRouter } from "./src/routes/blocks.routes.js";
import { groupRouter } from "./src/routes/groups.routes.js";
import { periodRouter } from "./src/routes/periods.routes.js";

const REQUIRED_ENV = [
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
] as const;

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const PORT = Number(process.env.PORT ?? 3000);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:8080";

const app = express();

// MIDDLEWARES
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// HEALTH CHECK
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ROUTES
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/elements", elementRouter);
app.use("/blocks", blockRouter);
app.use("/groups", groupRouter);
app.use("/periods", periodRouter);

// SPECIFIC ROUTES ERROR HANDLING
app.use(handleUserErrors);

// GLOBAL ERROR HANDLING
app.use(handleServerErrors);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
