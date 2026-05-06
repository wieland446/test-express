import type { Request, Response, NextFunction } from "express";
import { findAllBlocks, findBlockByName } from "../repositories/blocks.repo.js";
import { statusCodes } from "../helpers/statusCodes.js";

const VALID_BLOCKS = new Set(["s", "p", "d", "f"]);

export async function handleGetBlocks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const blocks = await findAllBlocks();
    res.set("Cache-Control", "public, max-age=3600");
    return res.json(blocks);
  } catch (err) {
    return next(err);
  }
}

export async function handleGetBlockByName(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blockName } = req.params;

  if (!blockName || !VALID_BLOCKS.has(blockName)) {
    return res.status(statusCodes.badRequest).json({
      message: "block name must be one of: s, p, d, f",
    });
  }

  try {
    const block = await findBlockByName(blockName);
    if (block === null) {
      return res.status(statusCodes.notFound).json({ message: `Block '${blockName}' not found` });
    }
    return res.json(block);
  } catch (err) {
    return next(err);
  }
}
