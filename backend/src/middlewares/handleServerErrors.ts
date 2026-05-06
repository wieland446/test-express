import type { Request, Response, NextFunction } from "express";
import { logger } from "../helpers/logger.js";

const handleServerErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err.message, { stack: err.stack, path: req.path });
  res.status(500).json({ message: "Internal server error" });
};

export default handleServerErrors;
