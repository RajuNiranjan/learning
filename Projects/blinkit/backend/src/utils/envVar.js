import dotenv from "dotenv";
dotenv.config();

export const {
  MONGODB_URI,
  DB_NAME,
  PORT,
  FRONT_END_ORIGIN,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
