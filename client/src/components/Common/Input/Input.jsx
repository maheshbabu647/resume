import React from 'react'
import styles from './Input.module.css'

const Input = ({
    label,
    id,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    error = null,
    required = false,
    className = '',
    inputClassName = '',
    helperText,
    ...props //
}) => {

    const inputClasses = `
    ${styles.input}
    ${error ? styles.inputError : ''}
    ${inputClassName}
    `.trim();

    const InputElement = type === 'textarea' ? 'textarea' : 'input'

    return (
        <div className={`${styles.formGroup} ${className}`}>
            {label && (
                <label htmlFor = {id} className = {styles.label}>
                    {label}
                    {required && <span className = {styles.required}> * </span>}
                </label>
            )}
            <InputElement 
                type = {type === 'textarea' ? undefined : type}
                id = {id}
                name = { name || id }
                value = { value || ''}
                onChange = { onChange }
                placeholder = { placeholder } 
                required = { required }
                className = {inputClasses}
                aria-invalid = { !!error }
                aria-describedby = { error ? `${id}-error` : (helperText ? `${id}-helper` : undefined) }
                {...props}
            />
            {helperText && !error && (
                <small id={`${id}-helper`} className={styles.helperText}>
                    {helperText}
                </small>
            )}
            {error && (
                <p id={`${id}-error`} className={styles.errorMessage} role="alert">
                    {error}
                </p>
            )}
        </div>
    )

}

export default Input