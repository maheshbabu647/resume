import React from 'react'

import styles from './LoadingSpinner.module.css'

const LoadingSpinner = ({
    size = 'medium',
    center = false,
    className = '',
    label = 'Loading...'
    }) => {

    const sizeClass = size === 'medium' ? '' : styles.size
    const centerClass = center ? styles.center : ''
    
    const combinedClasses = `
        ${styles.spinner}
        ${sizeClass}
        ${centerClass}
        ${className}
    `
    return (
        <div 
            className={combinedClasses}
            role='status'
            aria-label={label}
        >
        </div>
    )

}

export default LoadingSpinner
