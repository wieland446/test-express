import path from "node:path";
import dotenv from "dotenv";
import { Pool } from "pg";
import { logger } from "../helpers/logger.js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

let pool: Pool | null = null;

export function getPostgresPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,

      max: Number(process.env.POSTGRES_POOL_MAX ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
    });

    pool.on("error", (err) => {
      logger.error("Unexpected PG pool error", { message: err.message });
      process.exit(1);
    });
  }

  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
