import { Router } from "express";
import {
  login,
  register,
  verifyEmail,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", login);
