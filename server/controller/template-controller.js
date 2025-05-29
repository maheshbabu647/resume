import mongoose from "mongoose";
import templateModel from "../model/template-model.js";

import { uploadImageToCloudinary, deleteImageFromCloudinary } from "../service/cloudinary-service.js";

// @desc    Get all templates
// @route   GET /api/templates
// @access  Admin (can be Public/User too depending on final requirements, currently Admin for consistency)
const getAllTemplates = async (req, res, next) => {

    try {

        const templates = await templateModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(templates);

    } 
    catch (error) {

    const err = new Error()
    err.name = error.name || "GET ALL TEMPLALATES FAILED"
    err.status = 500
    err.message = error.message || "Server error retrieving templatles"
    
    next(err)

    }
};

// @desc    Create a new template
// @route   POST /api/templates
// @access  Admin
const createTemplate = async (req, res, next) => {

    try {

        const { templateName, templateCode, templateFieldDefinition } = req.body;
        let templateImageUrl = ''
        let tempalatePublicId = ''
        let parsedTemplateFieldDefinition = []
        
        if( !templateName || !templateCode ) {
            const err = new Error("Tempalte name and code are requied and")
            err.status = 400
            return next(err)
        }


        if (templateFieldDefinition) {
            try {
                parsedTemplateFieldDefinition = JSON.parse(templateFieldDefinition)
                if (!Array.isArray(parsedTemplateFieldDefinition)) {
                    throw new Error('fieldDefinitions must be a valid JSON array.')
                }
            }
            catch(error) {
                const err = new Error()
                err.message = error.message || 'Invalid format for fieldDefintions. It must be a valid JSON array string.'
                err.status = 400
                return next(err)
            }
        }

        if (req.file) {
            const result = await uploadImageToCloudinary(req.file.buffer, req.file.originalname)
            templateImageUrl = result.secure_url
            tempalatePublicId = result.public_id
        } 
        else {
            const err = new Error('Template image file is required for creation.')
            err.status = 400
            return next(err)
        }
        
        const newTemplate = {
        templateName,
        templateCode,
        templateImage: templateImageUrl,
        templateImageId: tempalatePublicId,
        templateFieldDefinition: parsedTemplateFieldDefinition
        }

        const savedTemplate = await templateModel.create(newTemplate);

        res.status(201).json({
            message: 'Template created successfully',
            template: savedTemplate,
        });

    } 
    catch (error) {

        const err = new Error()
        err.name = err.name || "TEMPLATE CREATION FAILED"
        err.message = err.message || "Server error creating templatle"
        err.status = 500

        next(err)

    }
};

// @desc    Update an existing template
// @route   PUT /api/templates/:id
// @access  Admin
const updateTemplate = async (req, res, next) => {

    try {

        const { templateId } = req.params;
        const { templateName, templateCode, templateImage, templateFieldDefinition } = req.body;
        let parsedTemplateFieldDefinition

        if (!mongoose.Types.ObjectId.isValid(templateId)) {
        
            const err = new Error()
            err.status = 400  
            err.message = "invalid template id format"
    
            return next(err)
    
        }    

        const template = await templateModel.findById({ _id : templateId });

        if (!template) {
            
            const err = new Error()
            err.message = "Template not found"
            err.status = 404

            return next(err)
        }
  
        if (templateFieldDefinition !== undefined) {
             try {
            parsedTemplateFieldDefinition = JSON.parse(templateFieldDefinition)
            
            if (!Array.isArray(parsedTemplateFieldDefinition)) {
                throw new Error('fieldDefinitions must be a valid JSON array.')
            }
            }
            catch(error) {
                const err = new Error()
                err.message = error.message || 'Invalid format for fieldDefintions. It must be a valid JSON array string.'
                err.status = 400
                return next(err)
            }
        }
       
        const templateNewData = {
            templateName : templateName || template.templateName,
            templateCode : templateCode || template.templateCode,
            templateImage : templateImage || template.templateImage,
            templateFieldDefinition : templateFieldDefintion || template.templateFieldDefinition
        }

        const updatedTemplate = await templateModel.findOneAndUpdate({ _id : templateId },{ $set : templateNewData},{ new : true } )
        
        res.status(200).json({
            message: 'Template updated successfully',
            template: updatedTemplate,
        });

    } 
    catch (error) {

        const err = new Error()
        err.name = error.name || "UPDATE TEMPLATE FAILED"
        err.message = error.message || "Server error updating template"
        err.status = error.status

        next(err)
    }
};

// @desc    Delete a template
// @route   DELETE /api/templates/:templateId
// @access  Admin
const deleteTemplate = async (req, res, next) => {

    try {
   
        const { templateId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(templateId)) {

            const err = new Error()
            err.status = 400  
            err.message = "invalid template id format"

            return next(err)

        }

        const template = await templateModel.findById({ _id : templateId });

        if (!template) {
                    
            const err = new Error()
            err.message = "Template not found"
            err.status = 404

            return next(err)
        }

        await deleteImageFromCloudinary(tempalteImagePublicId)

        await templateModel.findOneAndDelete({ _id : templateId }); // Use deleteOne or remove (deprecated soon)

        res.status(200).json({ message: 'Template deleted successfully' });

    } 
    catch (error) {

        const err = new Error()
        err.name = error.name || "DELETE TEMPLATE FAILED"
        err.message = error.message || "Server error for deleting template"
        err.status = error.status 

        next(err)
    }
};

// @desc    Get a single template by ID (useful for users selecting one)
// @route   GET /api/templates/:id
// @access  Authenticated User/Admin
const getTemplateById = async (req, res, next) => {

    try {

        const { templateId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(templateId)) {
            
            const err = new Error()
            err.status = 400  
            err.message = "invalid template id format"
        
            return next(err)
    
        }

        const template = await templateModel.findById({ _id : templateId });

        if (!template) {

            const err = new Error()
            err.message = "Template not found"
            err.status = 404
    
            return next(err)

        }

        res.status(200).json(template);
    } 
    catch (error) {

        const err = new Error()
        err.name = error.name || "RETREIVE TEMPLATE FAILED"
        err.message = error.message || "Server error for retreving the template"
        err.status = error.status 

        next(err)
    }
};


export {
  getAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateById
};