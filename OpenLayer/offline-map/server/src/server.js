import express from 'express'
import { envVar } from './utils/env.js'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())


app.get("/" , (req, res) =>{
    res.status(200).json({
        message: "Hello World"
    })
})

app.listen(envVar.PORT, () => {
    console.log(`Server is running on port ${envVar.PORT}`)
})
