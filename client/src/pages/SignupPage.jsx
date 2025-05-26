import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import useAuthContext from '../hooks/useAuth.js'
import SignupForm from '../components/Auth/SignupForm.jsx'
import styles from './AuthPages.module.css'

const SignupPage = () => {
  
  const navigate = useNavigate()
  const location = useLocation()
  const { signup, isLoading, error, isAuthenticated } = useAuthContext()

  const [pageError, setPageError] = useState(null)

  const from = location.state?.from?.pathname || '/resumes'

  useEffect(() => {

    if (isAuthenticated) {

      console.log("User already  authenticated, readirecting from Login page...")
      navigate(from, { replace: true})

    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    if (error) {
      setPageError(error)
    }
    else {
      setPageError(null)
    }
  }, [error])

  const handleSignup = async (Credentials) => {
    setPageError(null)

    const success = await signup(Credentials)

    if (success) {
      console.log('Signup successful, waiting for redirection...')
    } 
    else {
      console.log('Signup failed')
    }
  }

  if (isAuthenticated) {
    return <div>Redirecting...</div>
  }

  return (
    <div className = {styles.pageContainer}>
      <div className = {styles.authCard}>

        <h2 className =  {styles.title}>Create your Account!</h2>

        <SignupForm
          onSubmit = {handleSignup}
          isLoading = {isLoading}
          apiError = {pageError}
        />

        <p className = {styles.switchLink}>
          Already have an account? <Link to = '/signin'>Sign in</Link>
        </p>

      </div>
    </div>
  )

}


export default SignupPage