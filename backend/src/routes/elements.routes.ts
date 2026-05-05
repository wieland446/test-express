import express from "express";
import {
  handleGetElements,
  handleGetElementByName,
} from "../controllers/elements.controller.js";

const elementRouter = express.Router();

elementRouter.get("/", handleGetElements);
elementRouter.get("/:elementName", handleGetElementByName);

export { elementRouter };
