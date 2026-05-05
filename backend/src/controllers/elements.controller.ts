import type { Request, Response, NextFunction } from "express";
export async function getElements(  req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Here are the elements" });
}   
