import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from "./envVar.js";
import { UserModel } from "../models/user.model.js";

export const genAccessToken = async (userId, res) => {
  const token = await jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES_IN,
  });

  res.cookie("access_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 24 * 7,
    sameSite: "strict",
  });
};

export const genRefreshToken = async (userId, res) => {
  const token = await jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });

  await UserModel.findByIdAndUpdate(
    userId,
    { refresh_token: token },
    { new: true }
  );

  res.cookie("refresh_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 24 * 7,
    sameSite: "strict",
  });
};
