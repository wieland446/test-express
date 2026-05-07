import { getPostgresPool } from "../databases/pool.postgres.js";
import type { Element } from "../models/element.model.js";

const ELEMENT_SELECT = `
  SELECT name, symbol, atomic_number, atomic_weight, group_number, period, block
  FROM elements
`;

const mapRow = (row: Record<string, unknown>): Element => ({
  name: row.name as string,
  symbol: row.symbol as string,
  atomicNumber: row.atomic_number as number,
  atomicWeight: row.atomic_weight as number,
  group: row.group_number as number,
  period: row.period as number,
  block: row.block as string,
});

export const findElementByName = async (
  name: string,
): Promise<Element | null> => {
  const res = await getPostgresPool().query(`${ELEMENT_SELECT} WHERE name = $1`, [name]);
  return res.rows[0] ? mapRow(res.rows[0]) : null;
};

export const findAllElements = async (
  limit?: number,
  offset?: number,
): Promise<Element[]> => {
  const params: number[] = [];
  let query = ELEMENT_SELECT;
  if (limit !== undefined) {
    params.push(limit);
    query += ` LIMIT $${params.length}`;
  }
  if (offset !== undefined) {
    params.push(offset);
    query += ` OFFSET $${params.length}`;
  }
  const res = await getPostgresPool().query(query, params);
  return res.rows.map(mapRow);
};
