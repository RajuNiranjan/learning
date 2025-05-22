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

    if (!access_token && !refresh_token) {
      return next({
        statusCode: 401,
        message: "Unautorized",
      });
    }

    const decode_access_token = await jwt.verify(
      access_token,
      JWT_ACCESS_SECRET
    );
    const decode_refresh_token = await jwt.verify(
      refresh_token,
      JWT_REFRESH_SECRET
    );

    req.access_user = decode_access_token;
    req.refresh_user = decode_refresh_token;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
