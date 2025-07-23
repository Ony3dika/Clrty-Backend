import { Router } from "express";
import { getUser, getAllUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);

export default userRouter;
