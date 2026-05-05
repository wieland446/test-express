import express from "express";
import {
  handleGetPeriodByNumber,
  handleGetPeriods,
} from "../controllers/periods.controller.js";

const periodRouter = express.Router();

periodRouter.get("/", handleGetPeriods);
periodRouter.get("/:periodNumber", handleGetPeriodByNumber);

export { periodRouter };
