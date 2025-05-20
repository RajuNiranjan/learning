import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from "../utils/envVar.js";

export const authGuard = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;

    if (!access_token) {
      return next({
        statusCode: 401,
        message: "Unautorized",
      });
    }

    const decode = await jwt.verify(access_token, JWT_ACCESS_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
