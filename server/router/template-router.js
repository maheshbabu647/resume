import express from 'express'

import { getAllTemplates,
        createTemplate,
        updateTemplate,
        deleteTemplate,
        getTemplateById,
} from '../controller/template-controller.js'
import userAuthorization from '../middleware/user-authorization.js';
import { isAdmin } from '../middleware/admin-auth-middleware.js';
import { templateValidatorsMode, templateValidation } from '../validators/template-validators.js';
import upload from '../middleware/upload-middleware.js';

const templateRouter = express.Router();

// --- Template Management Routes (Admin Only) ---

// GET /api/templates - Get all templates
// Consider if non-admins should access this? If so, move protect/isAdmin inside specific routes.
// For now, protecting the whole route group for admins.
// Let's allow authenticated users to GET all templates and specific template by ID
templateRouter.get('/getAll', userAuthorization, getAllTemplates);
templateRouter.get('/:templateId', userAuthorization, templateValidatorsMode('getById'), templateValidation, getTemplateById);

// POST /api/templates - Create template
templateRouter.post('/add', userAuthorization, isAdmin, upload.single('templateImageFile'), templateValidatorsMode('create'), templateValidation, createTemplate);

// PUT /api/templates/:id - Update template
templateRouter.put('/:templateId', userAuthorization, isAdmin, templateValidatorsMode('update'), templateValidation, updateTemplate);

// DELETE /api/templates/:id - Delete template
templateRouter.delete('/:templateId', userAuthorization, isAdmin, templateValidatorsMode('delete'), templateValidation, deleteTemplate);


export default templateRouter