import express from "express";
import {
  handleGetGroupByNumber,
  handleGetGroups,
} from "../controllers/groups.controller.js";

const groupRouter = express.Router();

groupRouter.get("/", handleGetGroups);
groupRouter.get("/:groupNumber", handleGetGroupByNumber);

export { groupRouter };
