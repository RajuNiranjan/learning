import dotenv from "dotenv";
dotenv.config();

export const {
  DB_URI,
  JWT_SECRET,
  JWT_ALGORIHM,
  JWT_EXPIRES_IN,
  CLOUDINARY_NAM,
  CLOUDINARY_SECRT,
  CLOUDINARY_API_KE,
  FRONT_END_ORIGIN,
  PORT,
} = process.env;
