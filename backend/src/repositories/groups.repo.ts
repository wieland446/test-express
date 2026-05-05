import { getPostgresPool } from "../databases/pool.postgres.js";
import type { Group } from "../models/group.model.js";

const pool = getPostgresPool();

export const findGroupByNumber = async (
  number: number,
): Promise<Group | null> => {
  const res = await pool.query(`SELECT * FROM groups WHERE number = $1`, [
    number,
  ]);

  if (!res.rows[0]) {
    return null;
  }

  return {
    family: {
      number: res.rows[0].number,
      name: res.rows[0].name,
    },
  };
};

export const findAllGroups = async (): Promise<Group[]> => {
  const res = await pool.query("SELECT * FROM groups");
  return res.rows.map((row) => ({
    family: {
      number: row.number,
      name: row.name,
    },
  }));
};
