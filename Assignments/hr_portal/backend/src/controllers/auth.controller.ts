import { UserModel } from "../models/user.model";
import {
  hashedPassword,
  validatePassword,
  genAccessToken,
  genRefreshToken,
} from "../utils/helpers";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../utils/env_config";

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User Already existed" });

    const hashPassword = hashedPassword(password);

    const user = new UserModel({
      email,
      username,
      role,
      password: hashPassword,
    });
    await user.save();

    return res.status(201).json({ message: "User Registeration completed" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error duing singup" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const verifyPassword = validatePassword(password, user.password);

    if (!verifyPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const access_token = genAccessToken({ id: user._id, role: user.role });
    const refresh_token = genRefreshToken({ id: user._id });

    res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        access_token,
        user: { username: user.username, email: user.email, role: user.role },
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error duing login" });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const refresh_token = req.cookies.refresh_token;
  try {
    if (!refresh_token)
      return res.status(404).json({ message: "Refresh token missing" });

    const decode = jwt.verify(
      refresh_token,
      envConfig.REFRESH_SECRET as string
    ) as { id: string };

    const user = await UserModel.findOne({ _id: decode?.id });

    if (!user) return res.status(404).json({ message: "user not found" });

    const access_token = genAccessToken({ id: user._id, role: user.role });
    const new_refresh_token = genRefreshToken({ id: user._id });

    res
      .cookie("refresh_token", new_refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        access_token,
        user: { username: user.username, email: user.email, role: user.role },
      });
    console.log(decode);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error  " });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};
