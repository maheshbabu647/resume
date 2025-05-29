// import React, { useEffect } from 'react'
// import useTemplateContext from '../hooks/useTemplate.jsx'
// import TemplateCard from '../components/Template/TemplateCard.jsx'
// import LoadingSpinner from '../components/Common/LoadingSpinner/LoadingSpinner.jsx'

// import styles from './ListPage.module.css'

// const TemplatePage = () => {

//   const {
//     templates,
//     isLoadingTemplates,
//     templatesError,
//     getAllTemplates
//   } = useTemplateContext()

//   useEffect(() => {

//     if((templates.length === 0 && !templatesError) || templatesError) {
//       getAllTemplates()
//     }

//   }, [getAllTemplates, templates.length, templatesError])

//   let content;

//   if (isLoadingTemplates) {
//     console.log("loadin")
//     content = (
//       <div className = {styles.centeredMessage}>
//         <LoadingSpinner size = "large" center = {true} label = "Loading templates..." />
//       </div>
//     )
//   }
//   else if (templatesError) {
//     console.log("errr")
//     content = (
//       <div className = {`${styles.centeredMessage} ${styles.errorMessage}`}>
//         <p>Error: {templatesError}</p>
//         <p>we couldn't load the templates. Please try refreshing the page. If the problem persists, contact support.'</p>
//       </div>
//     )
//   }
//   else {
//     content = (
//       <div className = {styles.listGrid}>
//         {templates.map((template) => (
//           <TemplateCard key = {template._id} template = {template} />
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className = {styles.listPageContainer}>
//       <header className = {styles.listHeader}>
//         <h2>Choose a Template to Get Started</h2>
//       </header>
//       {content}
//     </div>
//   )
// }

// export default TemplatePage


import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // shadcn tabs component
import TemplateCard from '@/components/Template/TemplateCard';
import useTemplateContext from '@/hooks/useTemplate';


const TemplatePage = () => {

  const {
    templates,
    isLoadingTemplates,
    templatesError,
    getAllTemplates
  } = useTemplateContext()

  let content

  useEffect(() => {
    if((templates.length === 0 && !templatesError) || templatesError) {
      getAllTemplates()
    }
  }, [getAllTemplates, templates.length, templatesError])
    
  if (isLoadingTemplates) {
    content = (
      <div>
        <p>Loading</p>
      </div>
    )
  }
  else if (templatesError){
    content = (
      <div>
        <p>Error: {templatesError}</p>
        <p>we cloudn't load the templates. Please try refreshing the page. If the problem persists,  contact support. </p>
      </div>
    )
  }
  else {
    content = (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {templates.map((template) => (
        <TemplateCard
          key={template._id}
          template = {template}
        />
      ))}
    </motion.div>
    )
  }

 

  return (
    <main className="p-12 bg-gray-100 min-h-screen flex flex-col items-center py-12">
      {/* Title and Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col justify-center w-2/4 items-center text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800">Resume Templates</h2>
        <p className="text-gray-600 mt-2">
          Choose from our collection of professionally designed templates to create your perfect resume. Each template is fully customizable and optimized for applicant tracking systems.
        </p>
      </motion.div>

      {/* Tabs for Filtering */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <Tabs defaultValue="professional" className="w-full">
          <TabsList className="grid w-[300px] grid-cols-3">
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="simple">Simple</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Template Cards Grid */}
      {content}
    </main>
  );
};

export default TemplatePage;