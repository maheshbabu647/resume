import React, { createContext, useState, useCallback, useContext} from 'react'
import { getAllTemplates as getTemplates } from '../api/templateServiceApi.js'
import useAuthContext from '../hooks/useAuth.js'

const TemplateContext = createContext(null)

const TemplateContextProvider = ({ children }) => {

    const [ templates, setTemplates ] = useState([])
    const [ isLoadingTemplates, setIsLoadingTemplates ] = useState(false)
    const [ templatesError, setTemplatesError ] = useState(null)

    const { isAuthenticated } = useAuthContext()

    const getAllTemplates = useCallback(async () => {

        if( !isAuthenticated ) {
            setTemplates([])
            setIsLoadingTemplates(false)
            setTemplatesError(null)

            return
        }

        setIsLoadingTemplates(true)
        setTemplatesError(null)

        try{

            const data = await getTemplates()
            setTemplates(Array.isArray(data) ? data : [])

        }
        catch(error) {

            console.error("Error fetching temaptles in tempalate context: ", error)
            setTemplatesError(error.message || "Failed to load templates. Please try again.")
        }
        finally {
            setIsLoadingTemplates(false)
        }
    }, [isAuthenticated])

    const contextValues = {
        templates,
        isLoadingTemplates,
        templatesError,
        getAllTemplates
    }

    return (
        <TemplateContext.Provider value={ contextValues }>
            {children}
        </TemplateContext.Provider>
    )
}

export { TemplateContext, TemplateContextProvider}