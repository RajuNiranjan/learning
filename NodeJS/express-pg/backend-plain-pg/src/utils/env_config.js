import { config } from "dotenv";
config();

export const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT,

  PORT,
  FRONTEND_ORIGIN,
} = process.env;
