import { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  logout,
  uploadAvatar,
  updateUser,
  forgetPassword,
  verifyForgetPasswordOtp,
  resetPassword,
  refreshToken,
  getUser,
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
userRouter.put("/update-user", authMiddleware, updateUser);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/verify-forget-password-otp", verifyForgetPasswordOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/get-user", authMiddleware, getUser);
userRouter.post("/refresh-token", refreshToken);
