import mongoose from 'mongoose'
import { ENV_VARIABLES } from '../utils/env.js'

const connectDB = async () => {
    try {
       if(!ENV_VARIABLES.MONGODB_URI) throw new Error('MONGODB_URI is not defined')
       await mongoose.connect(ENV_VARIABLES.MONGODB_URI)
       console.log('Server connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}

connectDB()