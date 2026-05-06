import type { Request, Response, NextFunction } from "express";
import { getAllBlocks, getBlockByName } from "../services/blocks.service.js";
import { statusCodes } from "../helpers/statusCodes.js";

export async function handleGetBlocks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const blocks = await getAllBlocks();
    res.json(blocks);
  } catch (err) {
    next(err);
  }
}

export async function handleGetBlockByName(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blockName } = req.params;

  if (!blockName) {
    return res.status(statusCodes.badRequest).json({
      message: "block name is required in request parameters",
    });
  }

  try {
    const blocks = await getBlockByName(blockName);
    return res.json(blocks);
  } catch (err) {
    return next(err);
  }
}
