import bcrypt from 'bcrypt'

import userModel from '../model/user-model.js'
import sendVerificationMail from '../service/email-verification-service.js'
import { createToken } from '../util/jwt.js'
import { createAuthCookie, clearAuthCookie } from '../util/auth-cookie.js'

const userSignUp = async (req, res, next) => {
    try{

        const {userName, userEmail, userPassword} = req.body

        const userExisted = await userModel.findOne({userEmail})

        if (userExisted){

         const err = new Error()
         err.name = 'USER ALREADY EXISTED'
         err.message = 'user already with the given email'
         err.status = 409

         throw err
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const userData = {userName, userEmail, userPassword : hashedPassword}

        const createdData = await userModel.create(userData)
        createdData.userPassword = "************"

        await sendVerificationMail(createdData._id, userName, userEmail)
        const authToken = await createToken({userId : createdData._id, userRole : createdData.userRole})
        await createAuthCookie(res, authToken)

        res.status(201).json({success : true, data :createdData})
    }
    catch(error){
   
        const err = new Error()
        err.name = error.name
        err.message = error.message
        err.status = error.status

        next(err)
    }
}


const userSignIn = async (req, res, next) => {
    try{

        const {userEmail, userPassword} = req.body

        const userExisted = await userModel.findOne({userEmail})

        if (!userExisted){
            const err = new Error()
            err.name = 'USER NOT FOUND'
            err.message = `Unable to find the user ${userEmail}`
            err.status = 404

            throw err
        }

        const userVerified = await bcrypt.compare(userPassword, userExisted.userPassword)

        if (!userVerified){
            const err = new Error()
            err.name = 'INCORRECT PASSWORD'
            err.message = 'The password entered is not valid'
            err.status = 401

            throw err
        }

        const authToken = await createToken({userId : userExisted._id, userRole : userExisted.userRole})
        await clearAuthCookie(res)
        await createAuthCookie(res, authToken)

        userExisted.userPassword = '*************'

        res.status(200).json({success : true, data : userExisted})
    }
    catch(error){
        const err = new Error()
        err.name = error.name || "USER SIGNIN FAILED"
        err.message = error.message
        err.status = error.status || null

        next(err)
    }
}

const authStatus = async (req, res, next) => {

    try{

        const { userId } = req.user

        const userData = await userModel.findById({_id : userId})
        userData.userPassword = "*********"

        res.status(200).json({success : true, data : userData})
    }
    catch (error) {
        const err = new Error()
        err.name = error.name || "Auth Status Failed"
        err.message = error.message
        err.status = error.status || null

        next(err)
    }
  
}

const userSignout = async (req, res, next) => {

    try{

        await clearAuthCookie(res)

        res.status(200).json({success : true})

    }
    catch (error) {
        const err = new Error()
        err.name = error.name || "signout Failed"
        err.message = error.message
        err.status = error.status || null

        next(err)
    }
}

export {userSignIn, userSignUp, userSignout, authStatus}