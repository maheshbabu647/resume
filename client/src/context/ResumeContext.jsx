import React, { createContext, useState, useCallback, useContext, Children } from "react";

import useAuthContext from '../hooks/useAuth'

import { getAllResumes as apiGetAllResumes,
         getById as apiGetById,
         createResume as apiCreateResume,
         updateResume as apiUpdateResume,
         deleteResume as apiDeleteResume
} from '../api/resumeServiceApi.js'

const ResumeContext = createContext(null)

const ResumeContextProvider = ({ children }) => {

    const { isAuthenticated, userData } = useAuthContext()

    const [ userResumesList, setUserResumesList ] = useState([])
    const [ isLoadingUserResumes, setIsLoadingUserResumes ] = useState(false)

    const [ currentResumeDetail, setCurrentResumeDetail ] = useState(null)
    const [ isLoadingCurrentResume, setIsLoadingCurrentResume ]= useState(false)

    const [ editorFormData, setEditorFormData ] = useState({})
        
    const [ isSavingResume, setIsSavingResume ] = useState(false)
    const [ isDeletingResume, setIsDeletingResume ] = useState(false)

    const [ resumeElement, setResumeElement ] = useState(null)

    const [ resumeError, setResumeError ] = useState(null)


    const loadUserResumes = useCallback(async () => {

        if (!isAuthenticated) {
            setUserResumesList([])
            setIsLoadingCurrentResume(false)
            return
        }

        setIsLoadingUserResumes(true)
        setResumeError(null)

        try {
            const data = await apiGetAllResumes()
            setUserResumesList(Array.isArray(data) ? data : [])
        }
        catch (error) {
            console.error('ResumeContext: Error in loadUserResumes:', error)
            setResumeError(error.message || 'Failed to load your resumes. Please try again.')
            setUserResumesList([])
        }
        finally {
            setIsLoadingUserResumes(false)
        }
    }, [isAuthenticated])


    const loadResumeForEditor = useCallback(async (resumeId) => {
        
        if (!isAuthenticated || !resumeId) {
            setCurrentResumeDetail(null)
            setEditorFormData({})
            setIsLoadingCurrentResume(false)

            if(!resumeId) {
                setResumeError('No Resume ID provided to load.')
            }

            return null
        }
        
        setIsLoadingCurrentResume(true)
        setResumeError(null)
        setCurrentResumeDetail(null)
        setEditorFormData({})

        try {
            const data = await apiGetById(resumeId)
            setCurrentResumeDetail(data)
            
            setEditorFormData(data?.resumeData && typeof data.resumeData === 'object' ? { ...data.resumeData } : {})
            
            return data
        }
        catch(error) {
            console.error(`ResumeContext: Error in loadResumeForEditor (ID: ${resumeId}):`, error)
            setResumeError(error.message || `Failed to load resume (ID: ${resumeId}). Please try again.`)

            setCurrentResumeDetail(null)
            setEditorFormData({})

            return null
        }
        finally {
            setIsLoadingCurrentResume(false)
        }

    }, [isAuthenticated])


    const prepareNewResumeForEditor = useCallback((template) => {

        if(!template || !template._id || !template.templateCode) {
            console.error('ResumeContex: prepareNewResumeForEditor - Invalid or incomplete template object provided.', template)
            setResumeError('Cannot prepare new resume: essential template information is missing.')
            
            setCurrentResumeDetail(null)
            setEditorFormData({})
            
            return
        }

        setCurrentResumeDetail({
            _id: null,
            userId: userData?._id,
            templateId: template,
            resumeData: {},
            resumeName: `My New ${template.templateName || 'Resume'}`,
        })

        setEditorFormData({})

        setResumeError(null)
        setIsLoadingCurrentResume(false)


    }, [userData])

    const saveOrUpdateCurrentResume = useCallback(async (formDataToSave, newResumeName) => {

        if(!isAuthenticated || !currentResumeDetail || !currentResumeDetail.templateId) {
            setResumeError("Cannot save: User not authenticated or essential resume/template details are missing.")
            return null
        }

        const tempalteIdForAPI = typeof currentResumeDetail.templateId === 'object'
        ? currentResumeDetail.templateId._id
        : currentResumeDetail.templateId

        if (!tempalteIdForAPI) {
            setResumeError("Cannot save: Template ID is missing from current resume details.")
            return nul
        }

        setIsSavingResume(true)
        setResumeError(null)

        const payload = {
            templateId: tempalteIdForAPI,
            resumeData: formDataToSave,
            resumeName: newResumeName || currentResumeDetail.resumeName || `My Resume ${new Data().toLocaleDateString()}`
        }

        try {
            let resume;
            if (currentResumeDetail._id) {
                resume = await apiUpdateResume(currentResumeDetail._id, payload)

                setUserResumesList(prevList => 
                    prevList.map(res => (res._id === resume._id ? resume : res))
                )
            }
            else {
                resume = await apiCreateResume(payload)
                
                setUserResumesList(prevList => [resume, ...prevList])
            }

            setCurrentResumeDetail(resume)

            setEditorFormData(resume.resumeData && typeof resume.resumeData === 'object')
            return resume
        }
        catch(error) {
            console.error("ResumeContext: Error in saveOrUpdateCurrentResume: ", error)
            setResumeError(error.message || "Failed to save your resume. Please try again.")
            return null
        }
        finally {
            setIsSavingResume(false)
        }
    }, [isAuthenticated, currentResumeDetail, userResumesList])

    const deleteResumeById = useCallback(async (resumeId) => {

        if (!isAuthenticated || !resumeId) {
            setResumeError("cannot delete: user not authenticated or no Resume ID provided.")
            return false
        }

        setIsDeletingResume(true)
        setResumeError(null)

        try {
            await apiDeleteResume(resumeError)

            setUserResumesList(prevList => prevList.filter(resume => resume._id !== resumeId))

            if (currentResumeDetail && currentResumeDetail._id === resumeId) {
                setCurrentResumeDetail(null)
                setEditorFormData({})
            }

            return true
        }
        catch (error) {
            console.error(`ResumeContext: Error in deleteresumeById (ID: ${resumeId}): `, error);
            setResumeError(error.message || `Failed to delete resume (ID: ${resumeId}). Please try again.`)
            return false
        }
        finally {
            setIsDeletingResume(false)
        }
    }, [isAuthenticated, currentResumeDetail])

    const clearCurrentEditorData = useCallback(() => {
        setCurrentResumeDetail(null)
        setEditorFormData({})
        setResumeError(null)
    }, [])

    const contextValue = {
        userResumesList,
        setUserResumesList,
        isLoadingUserResumes,
        setIsLoadingUserResumes,

        currentResumeDetail,
        setCurrentResumeDetail,
        isLoadingCurrentResume,
        setIsLoadingCurrentResume,
         
        editorFormData,
        setEditorFormData,

        isSavingResume,
        setIsSavingResume,

        isDeletingResume,
        setIsDeletingResume,
        resumeError,
        setResumeError,

        loadUserResumes,
        loadResumeForEditor,
        prepareNewResumeForEditor,
        saveOrUpdateCurrentResume,
        deleteResumeById,
        clearCurrentEditorData
    }

    return (
        <ResumeContext.Provider value={contextValue}>
            {children}
        </ResumeContext.Provider>
    )
}

export { ResumeContext, ResumeContextProvider }