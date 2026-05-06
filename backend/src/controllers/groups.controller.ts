import type { Request, Response, NextFunction } from "express";
import { getAllGroups, getGroupByNumber } from "../services/groups.service.js";
import { statusCodes } from "../helpers/statusCodes.js";

export async function handleGetGroups(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const groups = await getAllGroups();
    res.json(groups);
  } catch (err) {
    next(err);
  }
}

export async function handleGetGroupByNumber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { groupNumber } = req.params;

  if (!groupNumber) {
    return res.status(statusCodes.badRequest).json({
      message: "group number is required in request parameters",
    });
  }

  try {
    const group = await getGroupByNumber(Number(groupNumber));
    if (group === null) {
      return res.status(statusCodes.notFound).json({ message: `Group '${groupNumber}' not found` });
    }
    return res.json(group);
  } catch (err) {
    return next(err);
  }
}
