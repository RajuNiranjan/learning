import { Router } from "express";
import {
  checkAuth,
  login_controller,
  logout_controller,
  signupController,
} from "../controllers/auth.controller.js";
import { authGuard } from "../middlewares/authGuard.js";

export const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", login_controller);
authRouter.post("/logout", logout_controller);
authRouter.get("/check-auth", authGuard, checkAuth);
