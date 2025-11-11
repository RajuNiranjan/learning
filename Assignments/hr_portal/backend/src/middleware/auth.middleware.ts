import jwt from "jsonwebtoken";
import { envConfig } from "../utils/env_config";
import { Request, Response, NextFunction } from "express";

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, envConfig.ACCESS_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
