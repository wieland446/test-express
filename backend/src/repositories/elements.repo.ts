import { getPostgresPool } from "../databases/pool.postgres.js";
import type { Element } from "../models/element.model.js";

const pool = getPostgresPool();

export const findElementByName = async (
  name: string,
): Promise<Element | null> => {
  const res = await pool.query(`SELECT * FROM elements WHERE name = $1`, [
    name,
  ]);

  if (!res.rows[0]) {
    return null;
  }

  return {
    name: res.rows[0].name,
    symbol: res.rows[0].symbol,
    atomicNumber: res.rows[0].atomic_number,
    atomicWeight: res.rows[0].atomic_weight,
    group: res.rows[0].group,
    period: res.rows[0].period,
    block: res.rows[0].block,
  };
};

export const findAllElements = async (): Promise<Element[]> => {
  const res = await pool.query(`SELECT * FROM elements`);

  return res.rows.map((row) => ({
    name: row.name,
    symbol: row.symbol,
    atomicNumber: row.atomic_number,
    atomicWeight: row.atomic_weight,
    group: row.group,
    period: row.period,
    block: row.block,
  }));
};
