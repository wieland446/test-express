import type { Request, Response, NextFunction } from "express";
import { findAllElements, findElementByName } from "../repositories/elements.repo.js";
import { statusCodes } from "../helpers/statusCodes.js";

const ELEMENT_NAME_RE = /^[a-zA-Z\s\-']+$/;

export async function handleGetElements(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { limit, offset } = req.query;
  const parsedLimit = limit !== undefined ? Number(limit) : undefined;
  const parsedOffset = offset !== undefined ? Number(offset) : undefined;

  if (parsedLimit !== undefined && (!Number.isInteger(parsedLimit) || parsedLimit < 1)) {
    return res.status(statusCodes.badRequest).json({ message: "limit must be a positive integer" });
  }
  if (parsedOffset !== undefined && (!Number.isInteger(parsedOffset) || parsedOffset < 0)) {
    return res.status(statusCodes.badRequest).json({ message: "offset must be a non-negative integer" });
  }

  try {
    const elements = await findAllElements(parsedLimit, parsedOffset);
    res.set("Cache-Control", "public, max-age=3600");
    return res.json(elements);
  } catch (err) {
    return next(err);
  }
}

export async function handleGetElementByName(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { elementName } = req.params;

  if (!elementName || elementName.length > 40 || !ELEMENT_NAME_RE.test(elementName)) {
    return res.status(statusCodes.badRequest).json({
      message: "element name must be 1–40 letters, spaces, hyphens, or apostrophes",
    });
  }

  try {
    const element = await findElementByName(elementName);
    if (element === null) {
      return res.status(statusCodes.notFound).json({ message: `Element '${elementName}' not found` });
    }
    return res.json(element);
  } catch (err) {
    return next(err);
  }
}
