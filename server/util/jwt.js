import jwt from 'jsonwebtoken'

const createToken = async(payload) => {
    try{

        const JWT_SECRET = process.env.JWT_SECRET || 'jsonwebtokensecret'
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn : '1d'})
        
        return token

    }
    catch(error){
        const err = new Error()
        err.name = 'TOKEN CREATION FAILED'
        err.message = error.messaSECRET
        throw err
    }
}

const verifyToken = async(token) => {
    try{

        const JWT_SECRET = process.env.JWT_SECRET
        const payload = jwt.verify(token, JWT_SECRET)
        
        return payload

    }
    catch(error){
        const err = new Error()
        err.name = 'TOKEN VERIFICATION FAILED'
        err.message = error.message

        throw err
    }
}

export {createToken, verifyToken}