import { body, param, validationResult } from 'express-validator';

const templateValidatorsMode = (mode) => {
  const validators = [];

  if (mode === 'create' || mode === 'update') {
    validators.push(
      body('templateName')
        .if((value, { req }) => mode === 'create' || value !== undefined)
        .notEmpty().withMessage('Template name is required.')
        .trim()
        .escape()
    );

    validators.push(
      body('templateCode')
        .if((value, { req }) => mode === 'create' || value !== undefined)
        .notEmpty().withMessage('Template code is required.')
        .trim()
    );

    validators.push(
      body('templateImage')
        .if((value, { req }) => value !== undefined)
        .notEmpty().withMessage('Template image URL is required.')
        .isURL().withMessage('Template image must be a valid URL.')
        .trim()
    );
  }

  if (['update', 'delete', 'getById'].includes(mode)) {
    validators.push(
      param('templateId')
        .isMongoId().withMessage('Invalid template ID format.')
    );
  }

  return validators;
};

const templateValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation Error');
    err.status = 400;
    err.name = 'VALIDATION_ERROR';
    err.message = errors.array();
    return next(err);
  }
  next();
};

export {
  templateValidatorsMode,
  templateValidation
};
