import { Router } from "express";
import { validateMiddleware } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/user.schema";
import {
  loginController,
  logout,
  refreshTokenController,
  registerController,
} from "../controllers/auth.controller";

export const authRoute = Router();

authRoute.post(
  "/register",
  validateMiddleware(registerSchema),
  registerController
);

authRoute.post("/login", validateMiddleware(loginSchema), loginController);
authRoute.post("/refresh", refreshTokenController);
authRoute.post("/logout", logout);
