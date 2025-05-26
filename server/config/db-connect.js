import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
    try{
        const MONGOURI = process.env.MONGOURI || 'mongodb://localhost:27017'
        await mongoose.connect(MONGOURI)
        logger.info("Connected to DataBase")
    }
    catch(error){
        logger.warn(`Unable to connect to the DataBase : ${error.message}`)
    }
}

const disConnectDB = async () => {
    try{
        mongoose.disconnect()
        logger.info("Disconnected from DataBase")
    }
    catch(error){
        logger.warn(`Unable to disconnect the DataBase : ${error.message}`)
    }
}


export {connectDB, disConnectDB}