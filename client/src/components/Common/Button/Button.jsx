import React, { Children } from 'react'

import styles from './Button.module.css'

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  iconLeft = null,
  iconRight = null,
  className = '',
  loadingText = null,
  ...props //
}) => {

  const variantClass = styles[variant] || styles.primary
  const sizeClass = size === 'md' ? '' : styles[size]
  const loadingClass = isLoading ? styles.loading : ''
  const disabledClass = disabled ? styles.disabled : ''

  const combinedClasses = `
  ${styles.button}
  ${variantClass}
  ${sizeClass}
  ${loadingClass}
  ${disabledClass}
  ${className}`.trim().replace(/\s+/g, ' ')

  const isDisabled = disabled || isLoading

  return (
    
    <button 
      type = { type }
      onClick = { onClick }
      className = { combinedClasses }
      disabled = { isDisabled }
      aria-disabled = { isDisabled }
      {...props}
      >
        {isLoading ? (
          <>
            <div className = {styles.spinner} role = 'status' aria-hidden = ' true'></div>
            {loadingText ? (
              <span>{loadingText}</span>
            ) : (
              <span className = 'sr-only'>{children} Loading</span>
            )}
          </>
        ): (
          <>
            {iconLeft}
            {children && <em>{children}</em>}
            {iconRight}
          </>
        )}
      </button>
  )

} 

export default Button