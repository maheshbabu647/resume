import resumeModel from "../model/resume-model.js";

const createResume = async (req, res, next) => {
    
    try{

        const { templateId, resumeData, resumeName } = req.body
        const userId = req.user.userId

        const resume = {
            userId,
            templateId,
            resumeData,
            resumeName: resumeName || undefined
        }

        const savedResume = await resumeModel.create(resume)

        const populatedResume = await resumeModel.findById(savedResume._id).populate('templateId', 'templateName templateImage')

        res.status(201).json({
            success : true,
            message : 'Resume created successful',
            resume  : populatedResume || savedResume 
        })

    }
    catch(error) {

        const err = new Error('Error creating the resume : ', error.message || error)
        err.status = 400
        err.name = 'FAILED TO CREATE RESUME'

        next(err)
    }
}

const getResumeById = async (req, res, next) => {

    try{

        const { resumeId } = req.params
        const userId = req.user.userId

        const resume = await resumeModel.findById(resumeId).populate('templateId',  'templateName templateImage templateCode templateFieldDefinition')

        if (!resume) {
            const err = new Error('Resume not found.')
            err.status = 404
            
            return next(err)
        }

        if (resume.userId.toString() !== userId.toString()) {
            const err = new Error('Unauthorized. YOu do not have permission to access this resume.')
            err.status = 403

            return next(err)
        }

        res.status(200).json({success : true, resume})

    }
    catch(error){

        const err = new Error(error.message || 'Server error while fetcing resume.')
        err.status = error.status || 500

        next(err)
    }
}

const updateResume = async (req, res, next) => {

    try{
        const { resumeId } = req.params
        const { resumeData, resumeName } = req.body
        const userId = req.user.userId


        const resume = await resumeModel.findById(resumeId)

        if (!resume) {
            const err = new Error('Resume not found.')
            err.status = 404

            return next(err)
        }

        if (resume.userId.toString() !== userId.toString()) {
            const err = new Error('Unauthorized. You do not have permission to modify this resume.')
            err.status = 403

            return next(err)
        }

        const updateResume = {
            resumeName : resumeName || resume.resumeName,
            resumeData : resumeData || resume.resumeData
        }

        const updatedResume = await resumeModel.findByIdAndUpdate(resumeId, updateResume)

        const populatedResume= await resumeModel.findById(resumeId).populate('templateId', 'templateName templateImage templateCode')
        
        res.status(200).json({
            success : true,
            message : 'Resume updated successfully',
            resume : populatedResume
        })

    }
    catch(error) {

        const err = new Error(error.message || 'Server error while updating resume.')
        err.status = error.status || 500
        next(err)
    }
}

const getAllResumes = async (req, res, next) => {

    try{

        const userId = req.user.userId
        const resumes = await resumeModel.find({ userId })
        .sort({ updatedAt: -1 })
        .populate('templateId', 'tempateName templateImage')

    res.status(200).json({success: true, resumes})

    }
    catch(error) {

        const err = new Error(error.message || 'Failed to fetch the resumes.');
        err.status = error.status || 500
        
        next(err)
    }
}

const deleteResume = async (req, res, next) => {
    
    try{
        
        const { resumeId } = req.params
        const userId = req.user.userId

        const resume = await resumeModel.findById(resumeId)

        if (!resume) {
            const err = new Error('Resume not found.')
            err.status = 404

            return next(err)
        }

        if (resume.userId.toString() !== userId.toString()) {
            const err = new Error('Unauthorized. You do not have permission to delete this resume.')
            err.status = 403

            return next(err)
        }

        await resumeModel.findByIdAndDelete(resumeId)

        res.status(200).json({ message : 'Resume deleted successfully.'})

    }
    catch(error){

        const err = new Error(error.message || 'Server error while deleting resume.')
        err.status = error.status || 500
        
        next(err)
    }
}

export { createResume,
         getResumeById,
         updateResume, 
         getAllResumes,
         deleteResume }