import React from "react";
import { Link } from 'react-router-dom'
import Button from "../Common/Button/Button.jsx";
import styles from './TemplateCard.module.css'

const TemplateCard = ({ template }) => {

    if(!template) {
        return null
    }

    const fallbackImage = 'https://placehold.co/300x400/E0E0E0/B0B0B0?text=No+Preview'

    const imageUrl = template.templateImage && typeof template.templateImage === 'string'
    ? template.templateImage
    : fallbackImage

    return (
        <article className = {styles.card} aria-labelledby={`template-name-${template._id}`}>
            
            <div className = {styles.imageContainer}>
                <img
                    src = {imageUrl}
                    alt = {`${template.templatename || 'unnamed template'} preview`}
                    className = {styles.templateImage}
                    loading="lazy"
                    onError = {(e) => {
                        e.target.onerror = null
                        e.target.src = fallbackImage
                    }}
                />
            </div>

            <div className = {styles.cardContent}>
                <h3 id = {`template-name-${template._id}`} className = {styles.temlateName}>
                    {template.templateName || 'Unnamed Template'}
                </h3>

                <Link to = {`/resume/new/${template._id}`} className = {styles.useButtonLink}>
                    <Button variant='primary' size='sm' className = {styles.useButton}>
                        Use This Template
                    </Button>
                </Link>
            </div>
            
        </article>
    )
}

export default TemplateCard