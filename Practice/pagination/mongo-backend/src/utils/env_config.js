import { config } from "dotenv";
config();

export const {
  DB_URI,
  PORT,
  FRONTEND_URI,
  ACCESS_SECRET,
  REFRESH_SECRET,
  ACCESS_EXP_IN,
  REFRESH_EXP_IN,
} = process.env;
