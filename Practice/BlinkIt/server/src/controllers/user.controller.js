import { sendEmail } from "../config/sendEmail.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { ENV_VARIABLES } from "../utils/env.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

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
