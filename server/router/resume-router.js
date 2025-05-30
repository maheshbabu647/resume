import express from 'express'

import userAuthorization from '../middleware/user-authorization.js'
import { createResume, deleteResume, downlaodResume, getAllResumes, getResumeById, updateResume } from '../controller/resume-controller.js'
import { resumeValidatorsMode, resumeValidation } from '../validators/resume-validators.js'

const resumeRouter = express.Router()

resumeRouter.post('/add', userAuthorization, resumeValidatorsMode('create'), resumeValidation, createResume)
resumeRouter.get('/getById/:resumeId', userAuthorization, resumeValidatorsMode('getById'), resumeValidation, getResumeById)
resumeRouter.put('/update/:resumeId', userAuthorization, resumeValidatorsMode('update'), resumeValidation, updateResume)
resumeRouter.get('/getAll', userAuthorization, resumeValidatorsMode('getAll'), resumeValidation, getAllResumes)
resumeRouter.delete('/delete/:resumeId', userAuthorization, resumeValidatorsMode('delete'),resumeValidation, deleteResume)
resumeRouter.post('/download', downlaodResume)

export default resumeRouter

