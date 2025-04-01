import { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  logout,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", authMiddleware, logout);
