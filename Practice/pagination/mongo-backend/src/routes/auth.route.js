import { Router } from "express";
import { AuthGuard } from "../middlewares/auth.middleware.js";
import {
  logInController,
  refreshController,
  registerController,
  logOutcontroller,
} from "../controllers/auth.controller.js";

export const AuthRoute = Router();

AuthRoute.post("/register", registerController);
AuthRoute.post("/login", logInController);
AuthRoute.get("/refresh", AuthGuard, refreshController);
AuthRoute.post("/logout", AuthGuard, logOutcontroller);
