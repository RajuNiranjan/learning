import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "./env.js";

export const generateAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, ENV_VARIABLES.JWT_SECRET, {
    expiresIn: "3h",
  });
  return token;
};
