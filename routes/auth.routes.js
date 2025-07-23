import { Router } from "express";
import { SignIn, signOut, signUp } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
