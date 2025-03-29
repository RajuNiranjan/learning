import { Router } from "express";
import { register } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/register", register);
