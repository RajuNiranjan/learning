import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/env_var.js";

export const authGuard = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      next({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      next({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
