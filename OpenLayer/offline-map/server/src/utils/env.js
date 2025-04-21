import dotenv from "dotenv";
dotenv.config()

export const envVar = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DATABASE_URL: process.env.DATABASE_URL,
}