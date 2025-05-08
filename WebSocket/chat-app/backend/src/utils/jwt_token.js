import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE_TIME } from "./env_var.js";
import { NODE_ENV } from "./env_var.js";

export const gen_token = (user_id, res) => {
  const token = jwt.sign({ user_id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE_TIME,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  return token;
};
