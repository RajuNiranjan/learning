import { sendEmail } from "../config/sendEmail.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { ENV_VARIABLES } from "../utils/env.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { cloudinaryAvatarUploader } from "../utils/cloudinaryAvatartUploader.js";
import { generateOtp } from "../utils/generateOtp.js";
import { forgetPasswordTemplate } from "../utils/forgetPasswordTemplate.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user alredy existed" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    await newUser.save();

    const url = `${ENV_VARIABLES.FRONTEND_URL}/verify-email?code=${newUser._id}`;

    const verifyEmail = await sendEmail({
      to: email,
      subject: " Welcome to BlinkIt – Verify Your Email!",
      html: verifyEmailTemplate(name, url),
    });

    const userRes = newUser.toObject();
    delete userRes.password;

    return res.status(201).json({
      message: "User created successfully",
      user: userRes,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid code" });
    }

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.status !== "ACTIVE") {
      return res.status(400).json({ message: "contact to Admin" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookieOptions);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { userId } = req;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.updateOne(
      { _id: userId },
      { $set: { refresh_token: "" } }
    );

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const { file, userId } = req;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const avatarUrl = await cloudinaryAvatarUploader(file);

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { avatar: avatarUrl } },
      { new: true }
    );

    return res.status(200).json({ message: "Avatar uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId, file } = req;

    const { name, email, mobile, password } = req.body;

    let hashPassword;
    if (password) {
      const salt = await bcrypt.genSalt(12);
      hashPassword = await bcrypt.hash(password, salt);
    }

    let avatarUrl;
    if (file) {
      avatarUrl = await cloudinaryAvatarUploader(file);
    }

    await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(mobile && { mobile }),
        ...(password && { password: hashPassword }),
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      {
        new: true,
      }
    );

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOtp();

    const expiresIn = new Date() + 60 * 60 * 1000;

    await UserModel.updateOne(
      { _id: user._id },
      { $set: { forgot_password_otp: otp, forgot_password_expiry: expiresIn } }
    );

    await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: expiresIn,
    });

    await sendEmail({
      to: email,
      subject: "Forget Password OTP",
      html: forgetPasswordTemplate(otp),
    });

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const verifyForgetPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.forgot_password_otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await UserModel.updateOne(
      { _id: user._id },
      { $set: { forgot_password_otp: null, forgot_password_expiry: null } }
    );

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
