import {config} from 'dotenv'

config()

const requiredENV = ["PORT", "MONGO_URI", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "ACCESS_EXPIRES_IN", "REFRESH_EXPIRES_IN"]

for(let key of requiredENV){
    if(!process.env[key]){
        throw new Error(`Missing required ENV ${key}`)
    }
}

export const envConfig ={
    PORT: Number(process.env.PORT),
    DB_URI: process.env.MONGO_URI as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    ACCESS_EXPIRES_IN: Number(process.env.ACCESS_EXPIRES_IN),
    REFRESH_EXPIRES_IN: Number(process.env.REFRESH_EXPIRES_IN)
}