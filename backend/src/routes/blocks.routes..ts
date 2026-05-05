import express from "express";
import {
  handleGetBlockByName,
  handleGetBlocks,
} from "../controllers/blocks.controller.js";

const blockRouter = express.Router();

blockRouter.get("/", handleGetBlocks);
blockRouter.get("/:blockName", handleGetBlockByName);

export { blockRouter };
