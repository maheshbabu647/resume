
// import react, { useState } from 'react'
// import Button from '../Common/Button/Button.jsx'
// import Input from '../Common/Input/Input.jsx'
// import styles from './SignupForm.module.css'

// const SignupForm = ({
//     onSubmit,
//     isLoading = false,
//     apiError = null
// }) => {

//     const [ name, setName ] = useState('')
//     const [ email, setEmail ] = useState('')
//     const [ password, setPassword ] = useState('')
//     const [ confirmPassword, setConfirmPassword ] = useState('')
//     const [ formError, setFormError ] = useState('')

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         if ( !name || !email || !password || !confirmPassword) {
//             setFormError('Please fill in all fields.')
//             return
//         }

//         if ( password !== confirmPassword ) {
//             setFormError('Passwords do not match.')
//             return
//         }

//         onSubmit({ userName: name, userEmail: email, userPassword: password })

//     }
//         return (
//             <form onSubmit = { handleSubmit } className = { styles.SignupFrom } noValidate>

//                 {apiError && (
//                 <p className = {styles.apiError} role="alert">
//                 {apiError}
//                 </p>
//                 )} 
                
//                 {formError && (
//                 <p className={ styles.formError } role = 'alert'>
//                 {formError}
//                 </p>
//                 )}
               
//                 <Input
//                     label = "Name"
//                     id = "name"
//                     type = "text"
//                     value = {name}
//                     onChange = {(e) => setName(e.target.value)}
//                     placeholder = 'Name'
//                     required = {true}
//                 />

//                 <Input 
//                     label = 'Email'
//                     id = 'signup-email'
//                     type = 'email'
//                     placeholder='Email'
//                     value = {email}
//                     onChange = {(e) => setEmail(e.target.value)}
//                     required = {true}
//                 />

//                 <Input 
//                     label = 'Password (min. 6 characters)'
//                     id = 'signup-password'
//                     type = 'password'
//                     value = {password}
//                     onChange = {(e) => setPassword(e.target.value)}
//                     placeholder = 'Create a password'
//                     required = {true}
//                 />

//                 <Input
//                     label="Confirm Password"
//                     id="signup-confirm-password"
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm your password"
//                     required={true}
//                 />

//                 <Button 
//                     type = "submit"
//                     variant = 'primary'
//                     isLoading = {isLoading}
//                     disabled = {isLoading}
//                     className = {styles.submitButton}
//                 >
//                     Sign Up
//                 </Button>
//             </form>
//         )
// }


// export default SignupForm

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';
import { Input } from "@/components/ui/input"; // shadcn input component
import { Button } from "@/components/ui/button"; // shadcn button component

const SignupForm = ({ onSubmit, isLoading, apiError }) => {
  const [formData, setFormData] = React.useState({
    userName: '',
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
      {/* Name Field */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          name="userName"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="pl-10 w-full"
          required
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="email"
          name="userEmail"
          placeholder="Email Address"
          value={formData.email}
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
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </Button>
    </motion.form>
  );
};

export default SignupForm;