import react, { Children, createContext, useCallback, useContext, useEffect, useState} from 'react'

import { authStatus, userSignin, userSignout, userSignup } from '../api/authServiceApi.js'

const AuthContext = createContext(null)

const AuthContextProvider = ({children}) => {

    const [authState, setAuthState] = useState({
        userData : null,
        isAuthenticated : false,
        isLoading : false,
        error : null
    })

    const checkStatus = useCallback(async () => {

        setAuthState(prev => ({ ...prev, isLoading : true, error : null }))

        try {

            const response = await authStatus()
            if (response.success) {

                const {userName, userEmail, userRole} = response.data
                const userData = {
                    userName,
                    userEmail,
                    userRole
                }

                setAuthState({
                    userData : userData,
                    isAuthenticated : true,
                    isLoading : false,
                    error : null
                })
            }
            else{
                setAuthState({
                    userData : null,
                    isAuthenticated : false,
                    isLoading : false,
                    error : null
                })
            }

        }
        catch (error) {

            console.log("Error checking the status : ", error)
            setAuthState({
                userData : null,
                isAuthenticated : false,
                isLoading : false,
                error : error?.message || 'Failed to verify authentication status'
            })
        }
    }, [])

    useEffect(() => {
        checkStatus();
    },[])

    const signin = useCallback( async (signinCredentials) => {

        setAuthState(prev => ({ ...prev, isLoading : true, error : null }))

        try{

            const response = await userSignin(signinCredentials)
            if(response.success){

                const {userName, userEmail, userRole} = response.data
                
                const userData = {
                    userName,
                    userEmail,
                    userRole
                }

                setAuthState({
                    userData,
                    isAuthenticated : true,
                    isLoading : false,
                    error : null
                })
            }
            else {
                throw new Error('Something went wrong, Please try again.')
                return false
            }

            return true

        }
        catch(error){

            console.log("Login error in context : ", error)
            setAuthState({
                userData : null,
                isAuthenticated : false,
                isLoading : false,
                error : error?.message || 'Login failed. Please try again.'
            })

            return false
        }
    }, [])

    const signup = useCallback(async (signupCredentials) => {

        setAuthState(( prev ) => ({ ...prev, isLoading : true, error : null }))
        try{

            const response = await userSignup(signupCredentials)
            if(response.success){

                const {userName, userEmail, userRole} = response.data
                const userData = {
                    userName,
                    userEmail,
                    userRole
                }

                setAuthState({
                    userData,
                    isAuthenticated : true,
                    isLoading : false,
                    error : null
                })
            } 
            else {
                throw new Error("Something went wrong, Please try again.")
                return false
            }

            return true

        }
        catch (error) {

            console.log('Signup failed in context : ', error)
            setAuthState({
                userData : null,
                isAuthenticated : false,
                isLoading : false,
                error : error?.message || 'Signup failed. Please try again.'
            })
        }
    }, [])

    const signout = useCallback(async () => {

        setAuthState((prev) => ({...prev, isAuthenticated : true, isLoading : true, error : null}))
        try{

            await userSignout()

        }
        catch(error){
            
            console.log("Server singout failed. Signinout locally")

        }
        finally {

            setAuthState({
                userData : null,
                isAuthenticated : false,
                isLoading : false,
                error : null
            })
            
            if ( window.location.path !== '/login' ) {
                window.location.href = '/login'
            }
        } 
    }, [])

    const value = {
        ...authState,
        signin,
        signup,
        signout
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

}

export { AuthContext, AuthContextProvider }