import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env.js";

export const authGuard = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
