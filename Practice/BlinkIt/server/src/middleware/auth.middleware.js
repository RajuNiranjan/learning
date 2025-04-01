import jwt from "jsonwebtoken";
import { ENV_VARIABLES } from "../utils/env.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, ENV_VARIABLES.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
