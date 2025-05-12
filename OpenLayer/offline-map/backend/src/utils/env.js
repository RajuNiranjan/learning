import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  FRONTEND_URL,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
  DATABASE_URL,
} = process.env;
