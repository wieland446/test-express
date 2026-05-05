import { getPostgresPool } from "../databases/pool.postgres.js";
import type { Group } from "../models/group.model.js";

const pool = getPostgresPool();

export const findGroupByName = async (name: string): Promise<Group | null> => {
  const res = await pool.query(`SELECT * FROM groups WHERE name = $1`, [name]);

  if (!res.rows[0]) {
    return null;
  }

  return {
    family: {
      name: res.rows[0].name,
      number: res.rows[0].symbol,
    },
  };
};

export const findAllGroups = async (): Promise<Group[]> => {
  const res = await pool.query("SELECT * FROM groups");
  return res.rows;
};
