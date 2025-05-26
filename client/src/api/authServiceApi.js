import apiSever from "./index.js";

const userSignin = async (signinCredentials) => {

    try{

        const response = await apiSever.post('/auth/signin', signinCredentials)
        return response.data

    }
    catch (error) {

        throw error.response?.data || { message : 'Login failed. Network error or Server unavailable.' }
    
    }
}

const userSignup = async (signupCredentials) => {

    try{

        const response = await apiSever.post('/auth/signup', signupCredentials)
        return response.data
    }
    catch (error) {

        throw error.response?.data || { message : 'Signup failed. Network error or Server unavailable.' }
    
    }
}

const authStatus = async () => {

    try{

        const response = await apiSever.get('/auth/status')
        return response.data

    }
    catch (error) {

        if( error.response && (error.response.status === 401 || error.response.status === 403)) {
            return { user : null }
        } 
        
        throw error.response?.data || { message : 'Failed to check authentication status. '}

    }
}

const userSignout = async () => {

    try{

        const response = await apiSever.post('/auth/signout')
        console.log(response)
        return response.data

    }
    catch (error) {

        console.log('Logout api call failed : ', error)
        throw error.response?.data || { message : 'Logour failed on server.'}
        
    }
}

export { userSignin, userSignup, authStatus, userSignout }