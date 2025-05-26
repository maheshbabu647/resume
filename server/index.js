import app from './app.js'
import logger from './config/logger.js'
import { connectDB, disConnectDB } from './config/db-connect.js'

const PORT = process.env.PORT || 5000

const startServer = async() => {
    await connectDB()
    app.listen(PORT , ()=>{
        logger.info(`Server is running on port ${PORT}`)
    })
}

const stopServer = async(signal) => {
        logger.info(`Received ${signal}. Closing app gracefully...`)
        await disConnectDB()
        process.exit(0)
}

process.on('SIGINT', ()=>stopServer('SIGNINT'))
process.on('SIGTERM', ()=>stopServer('SIGTERM'))


startServer()
