import { config } from "dotenv";
config();

export const {
  DATABASE_URL,
  FRONTEND_ORIGIN,
  PORT,
  ACCESS_SECRET,
  REFRESH_SECRET,
  ACCESS_EXP_IN,
  REFRESH_EXP_IN,
} = process.env;
