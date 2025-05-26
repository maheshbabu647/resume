import apiServer from './index.js'

const createResume = async (resumePayLoad) => {
    try{

        const response = await apiServer.post('/resume/add', resumePayLoad)
        return response.data.resume

    }
    catch(error){
        
        console.error('Error Creating new resume: ', error.response?.data || error.message)
        throw error.response?.data || {message : 'Failed to create resume. Network error or server unavailable.'}

    }
}

const getAllResumes = async () => {
    try{

        const response = await apiServer.get('/resume/getAll')
        return response.data.resumes


    }
    catch(error) {
        
        console.error('Error fetching user resumes: ', error.response?.data || error.message)
        throw error.response?.data || { message : 'Failed to fetch your resumes.'}
    }
}

const getById = async (resumeId) => {
    try{

        if(!resumeId) {
            throw new Error('Resume ID is required to fetch a resume.')
        }

        const response = await apiServer.get(`/resume/getById/${resumeId}`)
        
        return response.data.resume //Changed Here
    }
    catch(error) {
        
        console.error(`Error fetching resume with Id ${resumeId}: `, error.response?.data || error.message)
        throw error.response?.data || { message: `Failed to fetch resume ${resumeId}`}
    }
}

const updateResume = async (resumeId, resumePayLoad) => {
    try{

        if (!resumeId) {
            throw new Error('Resume ID is required to update a resume.')
        }
        console.log("hey")
        const response = await apiServer.put(`/resume/update/${resumeId}`, resumePayLoad)

        return response.data.resume

    }
    catch(error) {
        console.error(`Error updating resume with ID ${resumeId}`, error.response?.data || error.message)
        throw error.response?.data || { message : `Failed to update resume ${resumeId}`}
    }
}

const deleteResume = async (resumeId) => {
    try {

        if(!resumeId) {
            throw new Error(`Resume Id is required to delete a resume.`) 
       }

    const response = await apiServer.delete(`/resume/delete/${resumeId}`)
    
    return response.data

    }
    catch(error) {
        console.error(`Error deleting resume with ID ${resumeId}`, error.response?.data || error.message)
        throw error.response?.data || { message: `Failed to delete resume ${resumeId}.`}
    }
}

export {createResume,
        getAllResumes,
        getById,
        updateResume,
        deleteResume
}