import react from 'react'
import { Navigate, Outlet, replace, useLocation } from 'react-router-dom'

import useAuthContext from "../hooks/useAuth.js"
import LoadingSpinner from '../components/Common/LoadingSpinner/LoadingSpinner.jsx'


const ProtectedRoute = ({ roles }) => {

    const { isAuthenticated, isLoading } = useAuthContext()
    const location = useLocation()

    if ( isLoading ) {
        return <LoadingSpinner />
    }

    if ( !isAuthenticated ) {
        return <Navigate to='/signin' state = {{ from : location }} replace />
    }

    // if (roles && !roles.includes('user')) {
    //     console.warn(`Access Denied : User role {${user?.role}} not in required roles (${roles.join(',')}) for ${location.pathname}`)
    //     return <Navigate to='/resumes' replace />
    // }

    return <Outlet />
}

export default ProtectedRoute