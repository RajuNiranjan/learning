import { ENV } from '../utils/env.js'
import pkg from 'pg'

const {Pool} = pkg

export const pool = new Pool({
    user: ENV.DB_USER,
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    password: ENV.DB_PASSWORD,
    port: ENV.DB_PORT,
})

pool.on('connect', () => {
    console.log('connected to the database')
})

pool.on('error', (err) => {
    console.log('error connecting to the database', err)
})