import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../utils/env_config.js";

export const AuthGuard = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) res.status(403).json({ message: "un authorized" });
  try {
    const decode = jwt.verify(token, ACCESS_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
