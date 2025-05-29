// import react, { useState } from 'react'
// import Button from '../Common/Button/Button.jsx'
// import Input from '../Common/Input/Input.jsx'
// import styles from './LoginForm.module.css'

// const LoginForm = ({ 
//     onSubmit,
//     isLoading = false,
//     apiError = null
// }) => {

//     const [ email, setEmail ] = useState('')
//     const [ password, setPassword ] = useState('')
//     const [ formError, setFormError ] = useState('')
    
//     const handleSubmit = (event) => {
//         event.preventDefault()

//         if( !email || !password ) {

//             setFormError('Please enter both email and password')
//             console.log("client validation : please enter both email and password")
            
//             return
//         }
//         else {

//             onSubmit( { userEmail : email, userPassword : password })
//         }
//     }

//     return (
//         <form onSubmit = {handleSubmit} className = {styles.loginForm} noValidate>
            
//             { apiError && (
//                 <p className = {styles.apiError} role = "alert">
//                     {apiError}
//                 </p>
//             )}

//             <Input
//                 label = "Email Address"
//                 id = "login-email"
//                 type = "email"
//                 value = {email}
//                 onChange = {(e) => setEmail(e.target.value)}
//                 placeholder = "you@example.com"
//                 required = {true}
//             />

//             <Input 
//                 label = "Password"
//                 id = 'login-password'
//                 type = 'password'
//                 value = {password}
//                 onChange = {(e) => setPassword(e.target.value)}
//                 placeholder = "password"
//                 required = {true}
//             />

//             <Button
//                 type = 'submit'
//                 variant = 'primary'
//                 isLoading = {isLoading}
//                 disabled = {isLoading}
//                 className = {styles.submitButton}
//             >
//                 Login
//             </Button>

//         </form>
//     )
// }

// export default LoginForm

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { Input } from "@/components/ui/input"; // shadcn input component
import { Button } from "@/components/ui/button"; // shadcn button component

const LoginForm = ({ onSubmit, isLoading, apiError }) => {
  const [formData, setFormData] = React.useState({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Email Field */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="userEmail"
          name="userEmail"
          placeholder="Email Address"
          value={formData.userEmail}
          onChange={handleChange}
          className="pl-10 w-full"
          required
        />
      </div>

      {/* Password Field */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="password"
          name="userPassword"
          placeholder="Password"
          value={formData.userPassword}
          onChange={handleChange}
          className="pl-10 w-full"
          required
        />
      </div>

      {/* Error Message */}
      {apiError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm text-center"
        >
            {typeof apiError === 'string'
            ? apiError
            : apiError.msg || 'Something went wrong.'}
        </motion.p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? 'Logging In...' : 'Log In'}
      </Button>
    </motion.form>
  );
};

export default LoginForm;