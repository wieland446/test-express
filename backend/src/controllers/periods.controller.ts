import type { Request, Response, NextFunction } from "express";
import {
  getAllPeriods,
  getPeriodByNumber,
} from "../services/periods.service.js";
import { statusCodes } from "../helpers/statusCodes.js";

export async function handleGetPeriods(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const periods = await getAllPeriods();
    res.json(periods);
  } catch (err) {
    next(err);
  }
}

export async function handleGetPeriodByNumber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { periodNumber } = req.params;

  if (!periodNumber) {
    return res.status(statusCodes.badRequest).json({
      message: "period number is required in request parameters",
    });
  }

  try {
    const period = await getPeriodByNumber(Number(periodNumber));
    if (period === null) {
      return res.status(statusCodes.notFound).json({ message: `Period '${periodNumber}' not found` });
    }
    return res.json(period);
  } catch (err) {
    return next(err);
  }
}
