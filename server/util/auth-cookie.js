
const createAuthCookie = async (res, authToken) => {
    try{

        const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'localhost'

        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate()+1)

        const cookie_options = {
            httpOnly : true,
            secure : true,
            // domain : SERVER_DOMAIN,
            path : '/',
            expires : expiryDate,
            sameSite : 'None'
        }

        res.cookie("authToken", authToken, cookie_options)

    }
    catch(error){
        const err = new Error()
        err.name = 'COOKIE CREATION FAILED'
        err.message = error.message
        
        throw err
    }
}

const clearAuthCookie = async (res) => {
    try{
        
        const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'localhost'

        const cookie_options = {
            httpOnly : true,
            secure : true,
            // domain : SERVER_DOMAIN,
            path : '/',
            sameSite :'None'
        }

        res.clearCookie('authToken', cookie_options)
    }
    catch(error){
        const err = new Error()
        err.name = 'UNABLE TO CLEAR COOKIE'
        err.message = error.message

        throw err
    }
}

export {createAuthCookie, clearAuthCookie}