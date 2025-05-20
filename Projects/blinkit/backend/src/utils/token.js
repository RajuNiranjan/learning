import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "./envVar.js";

export const gen_token = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 24 * 7,
    sameSite: "strict",
  });
};
