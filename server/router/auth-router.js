import express from 'express'

import { userSignUpValidators,
         userSignUpValidation,
         userSignInValidators,
         userSignInValidation }
from '../validators/auth-validators.js';

import userAuthorization from '../middleware/user-authorization.js'

import { userSignUp, userSignIn, userSignout, authStatus } from '../controller/auth-controller.js';

const authRouter = express.Router();

authRouter.post('/signup', userSignUpValidators, userSignUpValidation, userSignUp)
authRouter.post('/signin', userSignInValidators, userSignInValidation, userSignIn)
authRouter.post('/signout', userAuthorization, userSignout)
authRouter.get('/status', userAuthorization, authStatus)

export default authRouter