    // // src/pages/ResumeEditorpage.js
    // import React, { useEffect, useState, useCallback, useRef } from "react";
    // import { useParams, useNavigate } from 'react-router-dom';
    // import jsPDF from 'jspdf'
    // import html2canvas from 'html2canvas'
    // // Using your hook names
    // import useAuthContext from '../hooks/useAuth.js';
    // import useTemplateContext from '../hooks/useTemplate';
    // import useResumeContext from '../hooks/useResume';

    // // Assuming your component paths and extensions
    // import LoadingSpinner from "../components/Common/LoadingSpinner/LoadingSpinner.jsx";
    // import Button from "../components/Common/Button/Button.jsx";
    // import ResumeForm from "../components/Resume/ResumeForm.jsx"; // This should be your DYNAMIC ResumeForm
    // import ResumePreview from "../components/Resume/ResumePreview.jsx";

    // import styles from './ResumeEditorPage.module.css';

    // // Helper function to initialize form data based on field definitions
    // // This creates an empty/default structure for your editorFormData
    // const initializeFormDataFromDefinitions = (definitions) => {
    //   const initialData = {};
    //   if (!Array.isArray(definitions)) {
    //     console.warn("Field definitions is not an array:", definitions);
    //     return initialData;
    //   }

    //   definitions.forEach(fieldDef => {
    //     const keys = fieldDef.name.split('.'); // Allows for nested names like "personalDetails.fullName"
    //     let currentLevel = initialData;

    //     keys.forEach((key, index) => {
    //       if (index === keys.length - 1) { // Last key in the path
    //         if (fieldDef.type === 'group' && fieldDef.repeatable) {
    //           // For repeatable groups, initialize with an empty array or one default item if specified
    //           currentLevel[key] = fieldDef.startWithEmpty === false && fieldDef.defaultItem ? [{ ...fieldDef.defaultItem }] : [];
    //         } else if (fieldDef.type === 'group' && !fieldDef.repeatable) {
    //           // For non-repeatable groups, initialize as an object for its subFields
    //           currentLevel[key] = {};
    //           if(Array.isArray(fieldDef.subFields)) {
    //             fieldDef.subFields.forEach(subField => {
    //                 // Assuming subField.name is just the key, not a nested path relative to the group
    //                 currentLevel[key][subField.name] = subField.defaultValue !== undefined ? subField.defaultValue : '';
    //             });
    //           }
    //         }
    //         else {
    //           // For simple fields, use defaultValue or empty string
    //           currentLevel[key] = fieldDef.defaultValue !== undefined ? fieldDef.defaultValue : '';
    //         }
    //       } else { // Create nested objects if they don't exist
    //         currentLevel[key] = currentLevel[key] || {};
    //         currentLevel = currentLevel[key];
    //       }
    //     });
    //   });
    //   // console.log("Initialized FormData from Definitions:", initialData);
    //   return initialData;
    // };

    // const ResumeEditorpage = () => {
    //   const { newResumeTemplateId, existingResumeId } = useParams();
    //   const navigate = useNavigate();
    //   const resumeRef = useRef()

    //   const { isAuthenticated, userData } = useAuthContext();
    //   const {
    //     templates: allTemplatesFromContext,
    //     isLoading: isLoadingTemplatesContext,
    //     getAllTemplates: getAllTemplatesFromContext, // Your context function name
    //   } = useTemplateContext();

    //   const {
    //     currentResumeDetail,      // Set by loadResumeForEditor or prepareNewResumeForEditor
    //     isLoadingCurrentResume,
    //     editorFormData,           // Live form data from context
    //     setEditorFormData,        // Setter from context
    //     isSavingResume,
    //     resumeError,
    //     loadResumeForEditor,
    //     prepareNewResumeForEditor, // This prepares currentResumeDetail in context
    //     saveOrUpdateCurrentResume,
    //     clearCurrentEditorData,
    //   } = useResumeContext();

    //   const [mode, setMode] = useState(null);
    //   const [pageIsLoading, setPageIsLoading] = useState(true);
    //   const [pageError, setPageError] = useState(null);
    //   // This will store the full template object (name, code, templateFieldDefinition)
    //   const [currentTemplateForEditor, setCurrentTemplateForEditor] = useState(null); // <<< NEW/REPURPOSED STATE

    //   // useEffect for initial data loading
    //   useEffect(() => {
    //     const setupEditor = async () => {
    //       setPageIsLoading(true);
    //       setPageError(null);
    //       setCurrentTemplateForEditor(null); // Reset on ID change

    //       if (!isAuthenticated && isAuthenticated !== null) {
    //         setPageError('Please log in to create or edit resumes.');
    //         setPageIsLoading(false);
    //         return; // navigate('/login', { replace: true }); // Optionally redirect
    //       }
    //       if (isAuthenticated === null) { // Auth context still loading
    //           setPageIsLoading(true);
    //           return;
    //       }

    //       if (existingResumeId) {
    //         setMode('edit');
    //         try {
    //           const loadedResume = await loadResumeForEditor(existingResumeId);
    //           if (loadedResume && loadedResume.templateId) {
    //             // loadedResume.templateId is the populated template object from backend
    //             // It should contain templateCode and templateFieldDefinition
    //             setCurrentTemplateForEditor(loadedResume.templateId); // <<< SET FULL TEMPLATE OBJECT
    //             // editorFormData is already set by loadResumeForEditor in your context
    //           } else if (!loadedResume && !resumeError) {
    //             setPageError('Failed to load your resume. It might not exist or you may not have permission.');
    //           }
    //         } catch (error) {
    //           console.error("ResumeEditorPage: Error caught from loadResumeForEditor:", error);
    //           setPageError(error.message || "An unexpected error occurred loading your resume.");
    //         } finally {
    //           setPageIsLoading(false);
    //         }
    //       } else if (newResumeTemplateId) {
    //         setMode('create');
    //         let targetTemplate = allTemplatesFromContext.find(t => t._id === newResumeTemplateId);

    //         if (!targetTemplate && !isLoadingTemplatesContext) {
    //           if (!allTemplatesFromContext || allTemplatesFromContext.length === 0) {
    //             try {
    //               await getAllTemplatesFromContext(); // Will trigger re-run of this effect
    //               return; 
    //             } catch (error) {
    //               console.error("ResumeEditorPage: Error fetching all templates: ", error);
    //               setPageError("Could not load templates list. Please try again.");
    //               setPageIsLoading(false);
    //               return;
    //             }
    //           }
    //         }
            
    //         targetTemplate = allTemplatesFromContext.find(t => t._id === newResumeTemplateId); // Re-check after potential fetch

    //         if (targetTemplate) {
    //           if (targetTemplate.templateCode && targetTemplate.templateFieldDefinition) {
    //             setCurrentTemplateForEditor(targetTemplate); // <<< SET FULL TEMPLATE OBJECT
    //             prepareNewResumeForEditor(targetTemplate);   // Sets currentResumeDetail in context

    //             // <<< CHANGED: Initialize editorFormData based on actual templateFieldDefinition >>>
    //             const initialData = initializeFormDataFromDefinitions(targetTemplate.templateFieldDefinition);
    //             setEditorFormData(initialData);
    //             setPageIsLoading(false);
    //           } else {
    //             setPageError(`Template (ID: ${newResumeTemplateId}) is missing essential code or field definitions.`);
    //             setPageIsLoading(false);
    //           }
    //         } else if (!isLoadingTemplatesContext) {
    //           setPageError(`The selected template (ID: ${newResumeTemplateId}) could not be found.`);
    //           setPageIsLoading(false);
    //         }
    //         // If isLoadingTemplatesContext is true, pageIsLoading will remain true or be set true by render logic below
    //       } else {
    //         setPageError("Invalid page access. No template or resume specified.");
    //         setPageIsLoading(false);
    //       }
    //     };

    //     setupEditor();

    //     return () => { // Cleanup
    //         if(typeof clearCurrentEditorData === 'function') {
    //             clearCurrentEditorData();
    //         }
    //     };
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [
    //     existingResumeId, newResumeTemplateId, isAuthenticated,
    //     loadResumeForEditor, prepareNewResumeForEditor, getAllTemplatesFromContext,
    //     JSON.stringify(allTemplatesFromContext), isLoadingTemplatesContext
    //     // setEditorFormData removed from here, it's called inside setupEditor
    //   ]);

    //   useEffect(() => { // Propagate resumeError from context to pageError
    //     if (resumeError) {
    //       setPageError(resumeError);
    //     }
    //   }, [resumeError]);

    //   // --- Form Data Change Handlers (These should be fine from your version) ---
    //   const handleSimpleChange = useCallback((fieldPath, value) => { // <<< CHANGED: path is first arg
    //     setEditorFormData(prevData => {
    //       const keys = fieldPath.split('.');
    //       let newFormData = { ...prevData };
    //       let currentLevel = newFormData;
    //       keys.forEach((key, index) => {
    //         if (index === keys.length - 1) {
    //           currentLevel[key] = value;
    //         } else {
    //           currentLevel[key] = { ...(currentLevel[key] || {}) };
    //           currentLevel = currentLevel[key];
    //         }
    //       });
    //       return newFormData;
    //     });
    //   }, [setEditorFormData]);

    //   const handleArrayItemChange = useCallback((arrayPath, itemIndex, fieldName, value) => {
    //     setEditorFormData(prevData => {
    //       const newArray = JSON.parse(JSON.stringify(prevData[arrayPath] || []));
    //       if (newArray[itemIndex]) {
    //         newArray[itemIndex] = { ...newArray[itemIndex], [fieldName]: value };
    //       }
    //       return { ...prevData, [arrayPath]: newArray };
    //     });
    //   }, [setEditorFormData]);

    //   const handleAddItemToArray = useCallback((arrayPath) => {
    //     // Get defaultItem structure from the current template's templateFieldDefinition
    //     const groupDefinition = currentTemplateForEditor?.templateFieldDefinition?.find(
    //       (def) => def.name === arrayPath && def.type === 'group' && def.repeatable
    //     );
    //     const newItem = groupDefinition?.defaultItem ? { ...groupDefinition.defaultItem } : {};

    //     setEditorFormData(prevData => ({
    //       ...prevData,
    //       [arrayPath]: [...(prevData[arrayPath] || []), newItem],
    //     }));
    //   }, [setEditorFormData, currentTemplateForEditor]); // Added currentTemplateForEditor

    //   const handleRemoveItemFromArray = useCallback((arrayPath, index) => {
    //     setEditorFormData(prevData => {
    //       const currentArray = prevData[arrayPath] || [];
    //       if (index < 0 || index >= currentArray.length) return prevData;
    //       const newArray = [...currentArray];
    //       newArray.splice(index, 1);
    //       return { ...prevData, [arrayPath]: newArray };
    //     });
    //   }, [setEditorFormData]);

    //   // --- Save Handler (Your version was good) ---
    //   const handleSaveResume = async () => {
    //     if ((mode === 'create' && !currentTemplateForEditor?._id) || (mode === 'edit' && !currentResumeDetail?._id)) {
    //       setPageError("Cannot save: Essential template or resume details are missing.");
    //       return;
    //     }

    //     let resumeNameToSave = currentResumeDetail?.resumeName;
    //     if (mode === 'create' && (!resumeNameToSave || resumeNameToSave.startsWith('My New'))) {
    //       const personalDetails = editorFormData.personalDetails || {};
    //       const userName = personalDetails.fullName || (userData ? userData.userEmail.split('@')[0] : 'User');
    //       const templateNamePart = currentTemplateForEditor?.templateName || 'Resume';
    //       resumeNameToSave = `${userName}'s ${templateNamePart} Resume`;
    //     } 
    //     else if (!resumeNameToSave){
    //        { resumeNameToSave = 'My Resume'; }
    //     }
      
    //     const savedResult = await saveOrUpdateCurrentResume(editorFormData, resumeNameToSave);
    //     if (savedResult && savedResult._id) {
    //       alert('Resume saved successfully!'); // Replace with better UI
    //       if (mode === 'create') {
    //         navigate(`/resume/edit/${savedResult._id}`, { replace: true });
    //       }
    //     } else {
    //       alert('Failed to save resume. ' + (pageError || resumeError || 'Please check details.'));
    //     }
    //   };

    //   const handleDownload = async () => {
    //     const resumeElement =  resumeRef.current

    //     if (!resumeElement) return;

    //     const canvas = await html2canvas(resumeElement, { scale: 3, useCORS : true}); // High-res
    //     const imgData = canvas.toDataURL('image/png');

    //     const imgProps = {
    //     width: canvas.width,
    //     height: canvas.height
    //     };

    //     const pdf = new jsPDF({
    //       orientation: 'portrait',
    //       unit: 'px',
    //       format: 'a4',
    //     });

    //     const pageWidth = pdf.internal.pageSize.getWidth();
    //     const pageHeight = pdf.internal.pageSize.getHeight();

    //     const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
    //     const imgWidth = imgProps.width * ratio;
    //     const imgHeight = imgProps.height * ratio;


    //     const x = (pageWidth - imgWidth) / 2;
    //     const y = 10; // or center with (pageHeight - imgHeight)/2

    //     pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    //     pdf.save('My_Resume.pdf');
 
    //  };


    //   // --- Render Logic ---
    //   // Get templateCode and templateFieldDefinition from currentTemplateForEditor for clarity
    //   const templateCode = currentTemplateForEditor?.templateCode || '';
    //   const templateFieldDefinition = currentTemplateForEditor?.templateFieldDefinition || [];

    //   // Overall loading: if auth is still checking, or page is explicitly loading
    //   if (isAuthenticated === null || pageIsLoading) {
    //     return ( <div className={styles.loadingOrErrorContainer}><LoadingSpinner size="large" label="Preparing Editor..." /></div> );
    //   }
    //   // If page setup resulted in an error (e.g., auth failed, invalid URL)
    //   if (pageError) {
    //     return ( <div className={`${styles.loadingOrErrorContainer} ${styles.errorMessage}`}><p>{pageError}</p><Button onClick={() => navigate(existingResumeId ? '/resumes' : '/templates')}>{existingResumeId ? 'Go to My Resumes' : 'Back to Templates'}</Button></div> );
    //   }
    //   // If mode is set but we couldn't get the template details (esp. templateFieldDefinition)
    //   if (mode && (!currentTemplateForEditor || !templateFieldDefinition.length)) {
       
    //     if ((mode === 'create' && isLoadingTemplatesContext) || (mode === 'edit' && isLoadingCurrentResume)) {
    //         // Still waiting for context to provide the necessary data
    //         return ( <div className={styles.loadingOrErrorContainer}><LoadingSpinner size="large" label="Loading Template Data..." /></div> );
    //     }
    //     return ( <div className={`${styles.loadingOrErrorContainer} ${styles.errorMessage}`}><p>Unable to initialize editor: Template information or field definitions are missing.</p><Button onClick={() => navigate('/templates')}>Return to Templates</Button></div>);
    //   }
    //   // If no mode is set and not loading (should be caught by pageError for invalid URL usually)
    //   if (!mode) {
    //     return ( <div className={`${styles.loadingOrErrorContainer} ${styles.errorMessage}`}><p>Cannot determine editor mode. Invalid URL.</p><Button onClick={() => navigate('/templates')}>Return to Templates</Button></div>);
    //   }

    //   return (
    //     <div className={styles.editorPageContainer}>
    //       <header className={styles.pageHeader}>
    //         <h2>
    //           {mode === 'create'
    //             ? `Creating with: ${currentTemplateForEditor?.templateName || 'Template'}`
    //             : `Editing: ${currentResumeDetail?.resumeName || 'Your Resume'}`}
    //         </h2>
    //         <Button
    //           onClick={handleSaveResume}
    //           isLoading={isSavingResume}
    //           disabled={isSavingResume || isLoadingCurrentResume || pageIsLoading}
    //           variant="success"
    //         >
    //           {isSavingResume ? 'Saving...' : (mode === 'create' ? 'Save New Resume' : 'Update Resume')}
    //         </Button>
    //           <Button
    //           onClick={handleDownload}
    //           disabled={isSavingResume || isLoadingCurrentResume || pageIsLoading}
    //           variant="success"
    //         >
    //           Download
    //         </Button>
    //       </header>

    //       <div className={styles.editorLayout}>
    //         <section className={styles.formPanel} aria-labelledby="resume-form-heading">
    //           <div className={styles.panelHeader}>
    //             <h3 id='resume-form-heading'>Resume Details</h3>
    //           </div>
    //           <ResumeForm
    //             templateFieldDefinition={templateFieldDefinition} // <<< PASS templateFieldDefinition
    //             formData={editorFormData || {}}
    //             onFormChange={handleSimpleChange} // Renamed for clarity
    //             onArrayChange={handleArrayItemChange}
    //             onAddItem={handleAddItemToArray}
    //             onRemoveItem={handleRemoveItemFromArray}
    //           />
    //         </section>

    //         <section className={styles.previewPanel} aria-labelledby="resume-preview-heading">
    //           <div className={styles.panelHeader}>
    //             <h3 id='resume-preview-heading'>Live Preview</h3>
    //           </div>
    //           <ResumePreview
    //             ref = {resumeRef}
    //             templateCode={templateCode} // Pass template code
    //             currentFormData={editorFormData}
    //           />
    //         </section>
    //       </div>
    //     </div>
    //   );
    // };

    // export default ResumeEditorpage;

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Eye, Download, Save, Undo, Redo, ArrowLeft } from "lucide-react";

import ResumePreview from "@/components/Resume/ResumePreview";

const ResumeEditorPage = () => {

  return (
    <>
      <div className="p-6 px-15 space-y-6 flex flex-col">
        
        {/* Title Section */}
        <div className="flex justify-between">

          <div className="flex items-center gap-3">
            <Button class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition"><ArrowLeft size={16} strokeWidth={1.5} /></Button>
            <div className="flex flex-col items-start justify-between gap-1">
              <h2 className="text-xl font-bold">Untitled Resume</h2>
              <p className="text-sm text-muted-foreground">Template: Classic</p>
            </div>
          </div>

        <div className="flex gap-2 self-center">
          <Button variant='outline'>
            <Eye className="w-4 h-4 mr-1" /> Preview
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
        </div>
        </div>
        
   

      {/* editor layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* left editor panel */}
        <div>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="achivements">Achivements</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Certifications</h3>
              <Button size="sm" variant="outline">
                + Add Certification
              </Button>
            </div>

          <Card>
            <CardContent className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Certification Name" defaultValue="AWS Certified Solutions Architect" />
                <Input placeholder="Issuing Organization" defaultValue="Amazon Web Services" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YYYY" />
                <Input placeholder="URL (Optional)" defaultValue="https://www.credential.net/..." />
              </div>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>

        {/* right editor panel */}
        <div className="relative border rounded-lg p-6 min-h-[500px] bg-white shadow-sm">
          <div className="flex justify-end space-x-2 mb-2">
            <Button size="sm" variant="outline">
              <Undo className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Redo className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-full flex items-center justify-center text-muted-foreground text-lg">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ResumeEditorPage