import { getPostgresPool } from "../databases/pool.postgres.js";
import type { Block } from "../models/block.model.js";

const pool = getPostgresPool();

export const findBlockByName = async (name: string): Promise<Block | null> => {
  const res = await pool.query(`SELECT * FROM blocks WHERE name = $1`, [name]);

  if (!res.rows[0]) {
    return null;
  }

  return {
    name: res.rows[0].name,
  };
};

export const findAllBlocks = async (): Promise<Block[]> => {
  const res = await pool.query("SELECT * FROM blocks");
  return res.rows;
};
