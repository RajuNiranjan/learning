import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_EXP_IN,
  ACCESS_SECRET,
  REFRESH_EXP_IN,
  REFRESH_SECRET,
} from "./env_config.js";

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt);
};

export const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const genAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP_IN });
};

export const genRefereshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP_IN });
};

export const verifyRefreshToken = (token) => {
  try {
    const decode = jwt.verify(token, REFRESH_SECRET);
    return decode;
  } catch (error) {
    console.log(error);
  }
};
