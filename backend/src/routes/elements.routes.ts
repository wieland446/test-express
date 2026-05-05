import express from "express";
import { getElements } from "../controllers/elements.controller.js";


const elementRouter = express.Router();

elementRouter.get("/", getElements);

export { elementRouter };
