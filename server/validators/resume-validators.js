import { body, param, validationResult } from 'express-validator'

const resumeValidatorsMode = (mode) => {

    const validators = []

    if (mode === 'create') {
        validators.push(
            body('templateId')
            .notEmpty().withMessage('Tempalte ID is required.')
            .isMongoId().withMessage('Invalid Template ID format.')
        )
    }

    if (mode === 'create') {
        validators.push(
            body('resumeData')
            .notEmpty().withMessage("Resume data is required.")
            .isObject().withMessage("Resume data must be an obeject.")
        )
    }
    else if (mode === 'update') {
        validators.push(
            body('resumeData')
            .optional()
            .isObject().withMessage('Resume data must be an object.')
        )
    }

    validators.push(
        body('resumeName')
        .optional()
        .isString().withMessage("Resume name must be a string.")
        .trim()
        .isLength({ max: 100}).withMessage('Resume name cannot exceed 100 characters.')
    )

    if (['getById', 'update', 'delete'].includes(mode)) {
        validators.push(
            param('resumeId')
            .isMongoId().withMessage('Invalid resume Id format')
        )
    }

    return validators

}

const resumeValidation = async (req, res, next) => {

    const error = validationResult(req)
    if(!error.isEmpty()) {
        
        const err = new Error()
        err.status = 400
        err.name = 'VALIDATION_ERROR'
        err.message = error.array()
        next(err)
    }
    next()
}

export {
    resumeValidatorsMode,
    resumeValidation
}