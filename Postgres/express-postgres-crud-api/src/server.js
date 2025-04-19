import express from 'express'
import cors from 'cors'
import {ENV} from './utils/env.js'
import {pool} from './config/db.js'
import { userRouter } from './routes/user.routes.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { createUserTable } from './data/createUserTable.js'


const app = express()

app.use(express.json())
app.use(cors())
app.use(createUserTable)
app.use('/api/v1/users', userRouter)
app.use(errorHandler)


app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT current_database()')
        res.status(200).json({
            message: 'Welcome to the API',
            data: result.rows[0].current_database
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching database information',
            error: error.message
        })
    }
})

const startServer = async () => {
    try {
        await createUserTable() // Create table during startup
        app.listen(ENV.PORT, () => {
            console.log(`server is running at port ${ENV.PORT}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error)
        process.exit(1)
    }
}

startServer()