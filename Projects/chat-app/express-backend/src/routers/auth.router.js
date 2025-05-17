import { Router } from "express";
import {
  login_controller,
  signupController,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", login_controller);
