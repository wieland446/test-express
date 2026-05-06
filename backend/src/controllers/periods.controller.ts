import type { Request, Response, NextFunction } from "express";
import { findAllPeriods, findPeriodByNumber } from "../repositories/periods.repo.js";
import { statusCodes } from "../helpers/statusCodes.js";

export async function handleGetPeriods(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const periods = await findAllPeriods();
    res.set("Cache-Control", "public, max-age=3600");
    return res.json(periods);
  } catch (err) {
    return next(err);
  }
}

export async function handleGetPeriodByNumber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { periodNumber } = req.params;
  const n = Number(periodNumber);

  if (!periodNumber || !Number.isInteger(n) || n < 1 || n > 7) {
    return res.status(statusCodes.badRequest).json({
      message: "period number must be an integer between 1 and 7",
    });
  }

  try {
    const period = await findPeriodByNumber(n);
    if (period === null) {
      return res.status(statusCodes.notFound).json({ message: `Period '${periodNumber}' not found` });
    }
    return res.json(period);
  } catch (err) {
    return next(err);
  }
}
