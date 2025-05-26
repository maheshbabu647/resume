import react, { useState } from 'react'
import Button from '../Common/Button/Button.jsx'
import Input from '../Common/Input/Input.jsx'
import styles from './LoginForm.module.css'

const LoginForm = ({ 
    onSubmit,
    isLoading = false,
    apiError = null
}) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formError, setFormError ] = useState('')
    
    const handleSubmit = (event) => {
        event.preventDefault()

        if( !email || !password ) {

            setFormError('Please enter both email and password')
            console.log("client validation : please enter both email and password")
            
            return
        }
        else {

            onSubmit( { userEmail : email, userPassword : password })
        }
    }

    return (
        <form onSubmit = {handleSubmit} className = {styles.loginForm} noValidate>
            
            { apiError && (
                <p className = {styles.apiError} role = "alert">
                    {apiError}
                </p>
            )}

            <Input
                label = "Email Address"
                id = "login-email"
                type = "email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
                placeholder = "you@example.com"
                required = {true}
            />

            <Input 
                label = "Password"
                id = 'login-password'
                type = 'password'
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                placeholder = "password"
                required = {true}
            />

            <Button
                type = 'submit'
                variant = 'primary'
                isLoading = {isLoading}
                disabled = {isLoading}
                className = {styles.submitButton}
            >
                Login
            </Button>

        </form>
    )
}

export default LoginForm