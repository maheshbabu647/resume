import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

import useAuthContext from '../hooks/useAuth.js'
import LoginForm from '../components/Auth/LoginForm.jsx'
import styles from './AuthPages.module.css'

const LoginPage = () => {
  
  const navigate = useNavigate()
  const location = useLocation()
  const { signin, isLoading, error, isAuthenticated } = useAuthContext()

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

  const handleLogin = async (Credentials) => {
    setPageError(null)

    const success = await signin(Credentials)

    if (success) {
      console.log('Login successful, waiting for redirection...')
    } 
    else {
      console.log('Login failed')
    }
  }

  if (isAuthenticated) {
    return <div>Redirecting...</div>
  }

  return (
    <div className = {styles.pageContainer}>
      <div className = {styles.authCard}>

        <h2 className =  {styles.title}>Welcome Back!</h2>

        <LoginForm
          onSubmit = {handleLogin}
          isLoading = {isLoading}
          apiError = {pageError}
        />

        <p className = {styles.switchLink}>
          Don't have an account? <Link to = '/signup'>Sign Up</Link>
        </p>

      </div>
    </div>
  )

}


export default LoginPage