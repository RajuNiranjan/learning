import { config } from "dotenv";

config();

const requiredENV = [
  "DB_URI",
  "PORT",
  "FRONTEND_ORIGINS",
  "ACCESS_SECRET",
  "REFRESH_SECRET",
  "ACCESS_EXPIRES_IN",
  "REFRESH_EXPIRES_IN",
] as const;

for (const key of requiredENV) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const envConfig = {
  DB_URI: process.env.DB_URI!,
  PORT: process.env.PORT!,
  FRONTEND_ORIGINS: process.env.FRONTEND_ORIGINS!,
  ACCESS_SECRET: process.env.ACCESS_SECRET!,
  REFRESH_SECRET: process.env.REFRESH_SECRET!,
  ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN!,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN!,
};
