import { Router } from "express";
import { signupController } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", signupController);
