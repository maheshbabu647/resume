// import React, { useState, useEffect } from 'react'
// import { useNavigate, useLocation, Link } from 'react-router-dom'

// import useAuthContext from '../hooks/useAuth.js'
// import SignupForm from '../components/Auth/SignupForm.jsx'
// import styles from './AuthPages.module.css'

// const SignupPage = () => {
  
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { signup, isLoading, error, isAuthenticated } = useAuthContext()

//   const [pageError, setPageError] = useState(null)

//   const from = location.state?.from?.pathname || '/dashboard'

//   useEffect(() => {

//     if (isAuthenticated) {

//       console.log("User already  authenticated, readirecting from Login page...")
//       navigate(from, { replace: true})

//     }
//   }, [isAuthenticated, navigate, from])

//   useEffect(() => {
//     if (error) {
//       setPageError(error)
//     }
//     else {
//       setPageError(null)
//     }
//   }, [error])

//   const handleSignup = async (Credentials) => {
//     setPageError(null)

//     const success = await signup(Credentials)

//     if (success) {
//       console.log('Signup successful, waiting for redirection...')
//     } 
//     else {
//       console.log('Signup failed')
//     }
//   }

//   if (isAuthenticated) {
//     return <div>Redirecting...</div>
//   }

//   return (
//     <div className = {styles.pageContainer}>
//       <div className = {styles.authCard}>

//         <h2 className =  {styles.title}>Create your Account!</h2>

//         <SignupForm
//           onSubmit = {handleSignup}
//           isLoading = {isLoading}
//           apiError = {pageError}
//         />

//         <p className = {styles.switchLink}>
//           Already have an account? <Link to = '/login'>Login</Link>
//         </p>

//       </div>
//     </div>
//   )

// }


// export default SignupPage

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthContext from '../hooks/useAuth.js';
import SignupForm from '../components/Auth/SignupForm.jsx';

const SignupPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, isLoading, error, isAuthenticated } = useAuthContext();

  const [pageError, setPageError] = useState(null);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User already authenticated, redirecting from Signup page...");
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (error) {
      setPageError(error);
    } else {
      setPageError(null);
    }
  }, [error]);

  const handleSignup = async (credentials) => {
    setPageError(null);
    const success = await signup(credentials);
    if (success) {
      console.log('Signup successful, waiting for redirection...');
    } else {
      console.log('Signup failed');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create your Account!
        </h2>

        <SignupForm
          onSubmit={handleSignup}
          isLoading={isLoading}
          apiError={pageError}
        />

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;