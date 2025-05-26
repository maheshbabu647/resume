import { verifyToken } from "../../util/jwt.js"
import userModel from "../../model/user-model.js"

const verifyUser = async (req, res, next) => {
    try{

        const verificationToken = req.params.verificationToken
        const {userId} = await verifyToken(verificationToken)
        const userExisted = await userModel.findOne({userId})

        if(!userExisted){
            const err = new Error()
            err.status = 401
            err.name = 'VERIFICATION FAILED'
            err.message = 'user verification link is invalid'

            throw err
        }

        await userModel.findOneAndUpdate({userId}, {verified : true})

        res.status(200).json({success : true, message : 'user verified'})
        
    }
    catch(error){
        const err = new Error()
        err.status = error.status || 401
        err.name = 'USER VERIFICATION FAILED'
        err.message = error.message

        next(err)
    }
}

export default verifyUser