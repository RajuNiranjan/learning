import jwt from 'jsonwebtoken'
import {envConfig} from './env_config'
import bcrypt from 'bcrypt'

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN} = envConfig


export const genAccessToken = (payload:Object)  =>{
    return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: ACCESS_EXPIRES_IN} )
}

export const genRefreshToken = (payload: Object) =>{
    return jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: REFRESH_EXPIRES_IN})
}

export const hashPassword = (passord:string):string =>{
    return bcrypt.hashSync(passord, 12)
}

export const verifyPassword = (password:string, hashedPassword:string): boolean =>{
    return bcrypt.compareSync(password, hashedPassword)
}