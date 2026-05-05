import { getPostgresPool } from "../databases/pool.postgres.js";
import type { Element } from "../models/element.model.js";

const pool = getPostgresPool();

const ELEMENT_SELECT = `
  SELECT e.name, e.symbol, e.atomic_number, e.atomic_weight,
         g.number AS group_number, p.number AS period_number, b.name AS block_name
  FROM elements e
  LEFT JOIN groups g ON e.group_id = g.id
  LEFT JOIN periods p ON e.period_id = p.id
  LEFT JOIN blocks b ON e.block_id = b.id
`;

const mapRow = (row: Record<string, unknown>): Element => ({
  name: row.name as string,
  symbol: row.symbol as string,
  atomicNumber: row.atomic_number as number,
  atomicWeight: row.atomic_weight as number,
  group: row.group_number as number,
  period: row.period_number as number,
  block: row.block_name as string,
});

export const findElementByName = async (
  name: string,
): Promise<Element | null> => {
  const res = await pool.query(`${ELEMENT_SELECT} WHERE e.name = $1`, [name]);
  return res.rows[0] ? mapRow(res.rows[0]) : null;
};

export const findAllElements = async (): Promise<Element[]> => {
  try {
    const res = await pool.query(ELEMENT_SELECT);
    return res.rows.map(mapRow);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};