import type { Request, Response, NextFunction } from "express";
import { logger } from "../helpers/logger.js";

const handleServerErrors = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.message, {
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
    path: req.path,
    requestId: res.locals.requestId,
  });
  res.status(500).json({ message: "Internal server error" });
};

export default handleServerErrors;
