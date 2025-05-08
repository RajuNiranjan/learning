import dotenv from "dotenv";

dotenv.config();

export const {
  DB_URI,
  DB_COLLECTION_NAME,
  PORT,
  FRONTEND_URL,
  JWT_SECRET,
  JWT_EXPIRE_TIME,
  NODE_ENV,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;
