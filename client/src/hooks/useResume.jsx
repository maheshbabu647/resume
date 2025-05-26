import { useContext } from "react";

import { ResumeContext } from "../context/ResumeContext.jsx";

const useResumeContext = () => {
    
    const context = useContext(ResumeContext)

    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider. Make sure ResumeProvider wrapped.')
    }

    if (context === null && ResumeContext._currentValue === undefined) {
        throw new Error('useResume received null from ResumeContext. This might mean ResumeProvider is missing or not providing a value.')
    }

    return context
}

export default useResumeContext