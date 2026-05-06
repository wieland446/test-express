import { getPostgresPool } from "../databases/pool.postgres.js";
import type { Period } from "../models/period.model.js";

const pool = getPostgresPool();

export const findPeriodByNumber = async (
  periodNumber: number,
): Promise<Period | null> => {
  const res = await pool.query(`SELECT * FROM periods WHERE number = $1`, [
    periodNumber,
  ]);

  if (!res.rows[0]) {
    return null;
  }

  return {
    protons: res.rows[0].number,
  };
};

export const findAllPeriods = async (): Promise<Period[]> => {
  const res = await pool.query("SELECT * FROM periods");
  return res.rows;
};
