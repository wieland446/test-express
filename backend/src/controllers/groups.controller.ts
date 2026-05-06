import type { Request, Response, NextFunction } from "express";
import { findAllGroups, findGroupByNumber } from "../repositories/groups.repo.js";
import { statusCodes } from "../helpers/statusCodes.js";

export async function handleGetGroups(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const groups = await findAllGroups();
    res.set("Cache-Control", "public, max-age=3600");
    return res.json(groups);
  } catch (err) {
    return next(err);
  }
}

export async function handleGetGroupByNumber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { groupNumber } = req.params;
  const n = Number(groupNumber);

  if (!groupNumber || !Number.isInteger(n) || n < 1 || n > 18) {
    return res.status(statusCodes.badRequest).json({
      message: "group number must be an integer between 1 and 18",
    });
  }

  try {
    const group = await findGroupByNumber(n);
    if (group === null) {
      return res.status(statusCodes.notFound).json({ message: `Group '${groupNumber}' not found` });
    }
    return res.json(group);
  } catch (err) {
    return next(err);
  }
}
