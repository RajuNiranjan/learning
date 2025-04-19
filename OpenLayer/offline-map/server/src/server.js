import express from 'express'
import { envVar } from './utils/env.js'
import cors from 'cors'
import {tileRouter} from './routes/tile.route.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(cors({
    origin: envVar.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.get("/" , (req, res) =>{
    res.status(200).json({
        message: "Hello World"
    })
})
app.get("/api/v1/test" , (req, res) =>{
    res.status(200).json({
        message: "Test endpoint is working"
    })
})

app.use("/api/v1/tile", tileRouter)

app.listen(envVar.PORT, () => {
    console.log(`Server is running on port ${envVar.PORT}`)
})
