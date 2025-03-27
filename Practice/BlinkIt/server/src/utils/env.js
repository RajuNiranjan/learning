import dotenv from 'dotenv'
dotenv.config()

export const ENV_VARIABLES = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    MONGODB_URI: process.env.MONGODB_URI,
}
