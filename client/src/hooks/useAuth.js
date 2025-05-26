import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const useAuthContext = () => {

    const context = useContext(AuthContext);
    if ( context === undefined ) {
        throw new Error('UseAuthContext must be used inside an AuthProvider')
    }

    return context;
}

export default useAuthContext