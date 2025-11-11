import jwt, { Secret, SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { envConfig } from "./env_config";

export const hashedPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const validatePassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};
type JwtExpiry = `${number}${"s" | "m" | "h" | "d"}` | number;

interface JwtPayload {
  [key: string]: any;
}

export const genAccessToken = (payload: JwtPayload): string => {
  const secret = envConfig.ACCESS_SECRET;
  if (!secret) throw new Error("Missing JWT_ACCESS_SECRET");

  const options: SignOptions = {
    expiresIn: envConfig.ACCESS_EXPIRES_IN as JwtExpiry,
  };

  return jwt.sign(payload, secret as Secret, options);
};

export const genRefreshToken = (payload: JwtPayload): string => {
  const secret = envConfig.REFRESH_SECRET;
  if (!secret) throw new Error("Missing JWT_REFRESH_SECRET");

  const options: SignOptions = {
    expiresIn: envConfig.REFRESH_EXPIRES_IN as JwtExpiry,
  };

  return jwt.sign(payload, secret as Secret, options);
};
