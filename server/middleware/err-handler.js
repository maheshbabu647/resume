import logger from "../config/logger.js"

const errorHandler = async(error, req, res, next) => {

    const err = new Error()
    err.name = error.name || 'INTERNAL SERVER ERROR'
    err.message =  error.message || 'Something went wrong in the server' 
    err.status = error.status || 500

    logger.error(`
        Status : ${err.status},
        Name : ${err.name},
        Message : ${err.message}
    `)

    res.status(err.status).json({
        name : err.name,
        message : err.message,
        success : false
    })
}

export default errorHandler