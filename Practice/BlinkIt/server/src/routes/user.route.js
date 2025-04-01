import { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  logout,
  uploadAvatar,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";
export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.put(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);
