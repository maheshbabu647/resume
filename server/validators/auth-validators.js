import {body, validationResult} from 'express-validator'

const userSignUpValidators = [

    body('userName')
    .isString().withMessage('User name must be string')
    .notEmpty().withMessage('User name must not be empty')
    .isAlphanumeric().withMessage('User name should contain only Alphabets and Numbers')
    .isLength({min : 2, max : 30}).withMessage('user name must be min of 2 characters and max of 30 characters')
    .trim(),

    body('userEmail')
    .isEmail().withMessage('User email must be in correct foramt')
    .notEmpty().withMessage('User email must not be empty')
    .normalizeEmail()
    .trim(),

    body('userPassword')
    .isString().withMessage('User password must a string')
    .notEmpty().withMessage('User Password should not be empty')
    .isLength({min : 8}).withMessage('User password must be minimum of 8 characters')
    .matches(/[A-Z]/).withMessage('User password must contain atleat one UpperCase')
    .matches(/[a-z]/).withMessage('User Password must contain atleast one LowerCase')
    .matches(/[0-9]/).withMessage('User password must contain atleast one numeric value')
    .matches(/[\W_]/).withMessage('User password must contain atleast one special symbol')

]

const userSignUpValidation = async(req, res, next) => {
    
    const error = validationResult(req)

    if(!error.isEmpty()){
        const err = new Error()
        err.status = 400
        err.name = 'VALIDATION ERROR'
        err.message = error.array()
        next(err)
    }

    next()
}


const userSignInValidators = [
    
    body('userEmail')
    .isEmail().withMessage('User email must be in correct foramt')
    .notEmpty().withMessage('User email must not be empty')
    .normalizeEmail()
    .trim(),

    body('userPassword')
    .notEmpty().withMessage("User password should not be empty")
    .isString().withMessage("User password must be a string")

]

const userSignInValidation = async (req, res, next) =>{

    const error = validationResult(req)

    if (!error.isEmpty()){

        const err = new Error()
        err.name = 'VALIDATION ERROR'   
        err.status = 400
        err.message = error.array()

        next(err)
    }

    next()
}

export {userSignUpValidators,
        userSignUpValidation,

        userSignInValidators, 
        userSignInValidation
    }