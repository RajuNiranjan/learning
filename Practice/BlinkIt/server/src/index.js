import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import './config/connectDB.js'
import { ENV_VARIABLES } from './utils/env.js'


const app = express()

app.use(cors({
    credentials:true,
    origin:[ENV_VARIABLES.FRONTEND_URL]
}))
app.use(cookieParser())
app.use(express.json())
app.use(helmet(
    {
        contentSecurityPolicy:false
    }
))
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(ENV_VARIABLES.PORT,()=>{
    console.log(`Server is running on port ${ENV_VARIABLES.PORT}`)
})


