import type { Request, Response, NextFunction } from "express";
import {
  getAllElements,
  getElementByName,
} from "../services/elements.service.js";
import { statusCodes } from "../helpers/statusCodes.js";

export async function handleGetElements(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const elements = await getAllElements();
    res.json(elements);
  } catch (err) {
    next(err);
  }
}

export async function handleGetElementByName(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { elementName } = req.params;

  if (!elementName) {
    return res.status(statusCodes.badRequest).json({
      message: "element name is required in request parameters",
    });
  }

  try {
    const elements = await getElementByName(elementName);
    return res.json(elements);
  } catch (err) {
    return next(err);
  }
}
