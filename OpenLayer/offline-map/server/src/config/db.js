import pkg from 'pg'
import {envVar} from '../utils/env.js'
const {Pool} = pkg

export const pool = new Pool({
    user: envVar.DB_USER,
    password: envVar.DB_PASSWORD,
    host: envVar.DB_HOST,
    port: envVar.DB_PORT,
    database: envVar.DB_DATABASE
})

pool.on("connect", () => {
    console.log("Connected to the database")
})

pool.on("error", (err) => {
    console.error("Error connecting to the database", err)
})