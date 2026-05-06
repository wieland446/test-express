import express from "express";
import {
  getUser,
  getUsers,
  createNewUser,
} from "../controllers/users.controller.js";

const userRouter = express.Router();

userRouter.get("/:userId", getUser);
userRouter.get("/", getUsers);
userRouter.post("/", createNewUser);

export { userRouter };
