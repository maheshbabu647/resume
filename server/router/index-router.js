import express from 'express'

import authRouter from './auth-router.js'
import templateRouter from './template-router.js'
import resumeRouter from './resume-router.js'

const indexRouter = express.Router()

indexRouter.use('/auth', authRouter)
indexRouter.use('/template', templateRouter)
indexRouter.use('/resume', resumeRouter)


export default indexRouter