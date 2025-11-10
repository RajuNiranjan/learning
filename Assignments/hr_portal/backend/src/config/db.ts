import {connect} from 'mongoose'
import {envConfig} from '../utils/env_config'


const connectDB = async() =>{
    if(!envConfig.DB_URI){
        console.log("Please provide DB URI")
        process.exit(1)
    }

    await connect(envConfig.DB_URI).then(() =>console.log("Connected to DataBase")).catch((e) =>console.log(e))
}

connectDB()