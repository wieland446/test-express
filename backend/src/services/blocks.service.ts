import { findAllBlocks, findBlockByName } from "../repositories/blocks.repo.js";

export async function getAllBlocks() {
  return await findAllBlocks();
}

export async function getBlockByName(name: string) {
  return await findBlockByName(name);
}
