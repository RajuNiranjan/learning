import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "./env.js";
import { UserModel } from "../models/user.model.js";

export const generateRefreshToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, ENV_VARIABLES.JWT_SECRET, {
    expiresIn: "7d",
  });

  const updateRefreshToken = await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  if (!updateRefreshToken) {
    throw new Error("Failed to update refresh token");
  }

  return token;
};
