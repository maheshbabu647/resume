import { verifyToken } from "../util/jwt.js"


const userAuthorization = async (req, res, next) => {

    try{

        const {authToken} = req.cookies

        if (!authToken){

            const err = new Error()
            err.name = 'AUTHORIZATION TOKEN NOT FOUND'
            err.message = 'Unable to find the authorization token in the cookie'
            err.status = 401

            return next(err)
            
        }
        const {userId, userRole} = await verifyToken(authToken)
        
        req.user = {userId, userRole}

        next()
    }
    catch(error){
        
        const err = new Error()
        err.name = error.name || 'AUTHORIZATION FAILED'
        err.message = error.message || 'unable to authorirze, signin again'
        err.status = 401

        next(err)
    }
}

export default userAuthorization