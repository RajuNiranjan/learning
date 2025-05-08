import { Router } from "express";
import {
  signUp,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { authGuard } from "../middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.put("/update-profile", authGuard, updateProfile);
authRouter.get("/check-auth", authGuard, checkAuth);
