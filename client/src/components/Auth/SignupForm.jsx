
import react, { useState } from 'react'
import Button from '../Common/Button/Button.jsx'
import Input from '../Common/Input/Input.jsx'
import styles from './SignupForm.module.css'

const SignupForm = ({
    onSubmit,
    isLoading = false,
    apiError = null
}) => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ formError, setFormError ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        if ( !name || !email || !password || !confirmPassword) {
            setFormError('Please fill in all fields.')
            return
        }

        if ( password !== confirmPassword ) {
            setFormError('Passwords do not match.')
            return
        }

        onSubmit({ userName: name, userEmail: email, userPassword: password })

    }
        return (
            <form onSubmit = { handleSubmit } className = { styles.SignupFrom } noValidate>

                {apiError && (
                <p className = {styles.apiError} role="alert">
                {apiError}
                </p>
                )} 
                
                {formError && (
                <p className={ styles.formError } role = 'alert'>
                {formError}
                </p>
                )}
               
                <Input
                    label = "Name"
                    id = "name"
                    type = "text"
                    value = {name}
                    onChange = {(e) => setName(e.target.value)}
                    placeholder = 'Name'
                    required = {true}
                />

                <Input 
                    label = 'Email'
                    id = 'signup-email'
                    type = 'email'
                    placeholder='Email'
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    required = {true}
                />

                <Input 
                    label = 'Password (min. 6 characters)'
                    id = 'signup-password'
                    type = 'password'
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder = 'Create a password'
                    required = {true}
                />

                <Input
                    label="Confirm Password"
                    id="signup-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required={true}
                />

                <Button 
                    type = "submit"
                    variant = 'primary'
                    isLoading = {isLoading}
                    disabled = {isLoading}
                    className = {styles.submitButton}
                >
                    Sign Up
                </Button>
            </form>
        )
}


export default SignupForm