import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required ENV: ${key}`);
  }
  return value;
}

export const env = {
  PORT: requireEnv("PORT"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  ACCESS_SECRET: requireEnv("ACCESS_SECRET"),
  REFRESH_SECRET: requireEnv("REFRESH_SECRET"),

  ACCESS_EXP_IN: requireEnv("ACCESS_EXP_IN") as jwt.SignOptions["expiresIn"],
  REFRESH_EXP_IN: requireEnv("REFRESH_EXP_IN"),

  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN ?? "",
};
