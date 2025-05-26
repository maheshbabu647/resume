import apiSever from "./index.js";

const createTemplate = async (templateData) => {

    try{

        const response = await apiSever.post('/template/create', templateData)
        return response.data

    }
    catch (error) {

        throw error.response?.data || { message : 'Failed to create Template' }

    }
}

const updateTemplate = async (templateData, templateId) => {

    try{

        const response = await apiSever.put(`/template/udpate/${templateId}`, templateData)
        return response.data

    }
    catch (error) {

        throw error.response?.data || { message : 'Failed to update Template' }

    }
}

const getTemplateById = async (templateId) => {

    try{

        const response = await apiSever.get(`/template/${templateId}`)
        return response.data

    }
    catch (error) {

        throw error.response?.data || { message : 'Failed to get the Template' }

    }
}

const getAllTemplates = async () => {

    try{

        const response = await apiSever.get('/template/getAll')
        return response.data

    }
    catch (error) {

        throw error.response?.data || { message : 'Failed to get the Templates' }

    }
}

const deleteTemplate = async (templateId) => {

    try{

        const response = await apiSever.delete(`/template/${templateId}`)
        return response.data

    }
    catch (error) {

        throw error.response?.data || { message : 'Failed to delete the Template' }

    }
}


export { createTemplate,
         updateTemplate,
         getTemplateById,
         getAllTemplates,
         deleteTemplate
}