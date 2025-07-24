import { Router } from "express";
import { getUser, getAllUsers, deleteUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
