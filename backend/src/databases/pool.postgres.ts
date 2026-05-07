import { Pool } from "pg";
import { logger } from "../helpers/logger.js";

let pool: Pool | null = null;

export function getPostgresPool(): Pool {
  if (!pool) {
    const port = Number(process.env.POSTGRES_PORT);
    if (isNaN(port) || port < 1 || port > 65535) {
      logger.error(`Invalid POSTGRES_PORT: ${process.env.POSTGRES_PORT}`);
      process.exit(1);
    }

    pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,

      max: Number(process.env.POSTGRES_POOL_MAX ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
      statement_timeout: 30_000,
      idle_in_transaction_session_timeout: 10_000,
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
