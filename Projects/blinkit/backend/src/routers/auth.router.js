import { Router } from "express";
import {
  forgetPassword,
  login,
  logout,
  signup,
  updateUserDetails,
  uploadAvatar,
  verifyEmail,
  verifyForgotPasswordOTP,
} from "../controllers/auth.controller.js";
import { authGuard } from "../middleware/authGuard.js";
import { upload } from "../middleware/multer.js";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", authGuard, logout);
authRouter.put(
  "/upload-avatar",
  authGuard,
  upload.single("avatar"),
  uploadAvatar
);
authRouter.put("/update-user", authGuard, updateUserDetails);
authRouter.post("/forget-password", forgetPassword);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/verify-otp", verifyForgotPasswordOTP);
