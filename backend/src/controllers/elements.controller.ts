import type { Request, Response, NextFunction } from "express";
import { getAllElements } from "../services/elements.service.js";

export async function getElements(req: Request, res: Response, next: NextFunction) {
  try {
    const elements = await getAllElements();
    res.json(elements);
  } catch (err) {
    next(err);
  }
}
