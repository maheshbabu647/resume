import { useContext } from "react";
import { TemplateContext, TemplateContextProvider } from "../context/TemplateContext.jsx";

const useTemplateContext = () => {
    
    const context = useContext( TemplateContext )
    
    if(context === undefined) {
        throw new Error('useTemplate must be used within a provider')
    }

    return context;
}

export default useTemplateContext