import React, { useEffect } from 'react'
import useTemplateContext from '../hooks/useTemplate.jsx'
import TemplateCard from '../components/Template/TemplateCard.jsx'
import LoadingSpinner from '../components/Common/LoadingSpinner/LoadingSpinner.jsx'

import styles from './ListPage.module.css'

const TemplatePage = () => {

  const {
    templates,
    isLoadingTemplates,
    templatesError,
    getAllTemplates
  } = useTemplateContext()

  useEffect(() => {

    if((templates.length === 0 && !templatesError) || templatesError) {
      getAllTemplates()
    }

  }, [getAllTemplates, templates.length, templatesError])

  let content;

  if (isLoadingTemplates) {
    console.log("loadin")
    content = (
      <div className = {styles.centeredMessage}>
        <LoadingSpinner size = "large" center = {true} label = "Loading templates..." />
      </div>
    )
  }
  else if (templatesError) {
    console.log("errr")
    content = (
      <div className = {`${styles.centeredMessage} ${styles.errorMessage}`}>
        <p>Error: {templatesError}</p>
        <p>we couldn't load the templates. Please try refreshing the page. If the problem persists, contact support.'</p>
      </div>
    )
  }
  else {
    content = (
      <div className = {styles.listGrid}>
        {templates.map((template) => (
          <TemplateCard key = {template._id} template = {template} />
        ))}
      </div>
    )
  }

  return (
    <div className = {styles.listPageContainer}>
      <header className = {styles.listHeader}>
        <h2>Choose a Template to Get Started</h2>
      </header>
      {content}
    </div>
  )
}

export default TemplatePage