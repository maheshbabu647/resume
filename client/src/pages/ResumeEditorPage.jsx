import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { downloadResume } from "@/api/resumeServiceApi";

// UI Components
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Trash2, 
  Eye, 
  Download, 
  Save, 
  Undo, 
  Redo, 
  ArrowLeft, 
  Plus,
  Loader2
} from "lucide-react";

// Custom Components
import ResumePreview from "@/components/Resume/ResumePreview";
import ResumeForm from "@/components/Resume/ResumeForm";

// Hooks
import useAuthContext from "@/hooks/useAuth";
import useTemplateContext from "@/hooks/useTemplate";
import useResumeContext from "@/hooks/useResume";

// Helper function to initialize form data based on field definitions
const initializeFormDataFromDefinitions = (definitions) => {
  const initialData = {};
  if (!Array.isArray(definitions)) {
    console.warn("Field definitions is not an array:", definitions);
    return initialData;
  }

  definitions.forEach(fieldDef => {
    const keys = fieldDef.name.split('.');
    let currentLevel = initialData;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (fieldDef.type === 'group' && fieldDef.repeatable) {
          currentLevel[key] = fieldDef.startWithEmpty === false && fieldDef.defaultItem 
            ? [{ ...fieldDef.defaultItem }] 
            : [];
        } else if (fieldDef.type === 'group' && !fieldDef.repeatable) {
          currentLevel[key] = {};
          if (Array.isArray(fieldDef.subFields)) {
            fieldDef.subFields.forEach(subField => {
              currentLevel[key][subField.name] = subField.defaultValue !== undefined 
                ? subField.defaultValue 
                : '';
            });
          }
        } else {
          currentLevel[key] = fieldDef.defaultValue !== undefined 
            ? fieldDef.defaultValue 
            : '';
        }
      } else { 
        currentLevel[key] = currentLevel[key] || {};
        currentLevel = currentLevel[key];
      }
    });
  });
  
  return initialData;
};

const ResumeEditorPage = () => {
  const { newResumeTemplateId, existingResumeId } = useParams();
  const navigate = useNavigate();
  
  const resumeRef = useRef();

  const { isAuthenticated, userData } = useAuthContext();
  const {
    templates: allTemplatesFromContext,
    isLoading: isLoadingTemplatesContext,
    getAllTemplates: getAllTemplatesFromContext,
  } = useTemplateContext();
  const {
    currentResumeDetail,
    isLoadingCurrentResume,
    editorFormData,
    setEditorFormData,
    isSavingResume,
    resumeError,
    loadResumeForEditor,
    prepareNewResumeForEditor,
    saveOrUpdateCurrentResume,
    clearCurrentEditorData,
  } = useResumeContext();

  const [mode, setMode] = useState(null);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [pageError, setPageError] = useState(null);
  const [currentTemplateForEditor, setCurrentTemplateForEditor] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [localStorageLoaded, setLocalStorageLoaded] = useState(true)
  const [downlaoding, setdownloading] = useState(false)


  // useEffect(() => {
  //   setLocalStorageLoaded(false)
  //   const data = localStorage.getItem('draftForm')
  //   console.log(data)
  //   if (data) {
  //     setEditorFormData(JSON.parse(data))
  //   } 
  //   setLocalStorageLoaded(true)
  // },[localStorageLoaded])

  // Initialize editor based on URL parameters
  useEffect(() => {
    const setupEditor = async () => {
      setPageIsLoading(true);
      setPageError(null);
      setCurrentTemplateForEditor(null);

      if (!isAuthenticated && isAuthenticated !== null) {
        setPageError('Please log in to create or edit resumes.');
        setPageIsLoading(false);
        return;
      }
      
      if (isAuthenticated === null) {
        return;
      }
      
      if (existingResumeId) {
        setMode('edit');
        try {
          const loadedResume = await loadResumeForEditor(existingResumeId);
          if (loadedResume && loadedResume.templateId) {
            setCurrentTemplateForEditor(loadedResume.templateId);
          } else if (!loadedResume && !resumeError) {
            setPageError('Failed to load your resume. It might not exist or you may not have permission.');
          }
        } catch (error) {
          console.error("ResumeEditorPage: Error caught from loadResumeForEditor:", error);
          setPageError(error.message || "An unexpected error occurred loading your resume.");
        } finally {
          setPageIsLoading(false);
        }
      } else if (newResumeTemplateId) {
        setMode('create');
        let targetTemplate = allTemplatesFromContext.find(t => t._id === newResumeTemplateId);

        if (!targetTemplate && !isLoadingTemplatesContext) {
          if (!allTemplatesFromContext || allTemplatesFromContext.length === 0) {
            try {
              await getAllTemplatesFromContext();
              targetTemplate = allTemplatesFromContext.find(t => t._id === newResumeTemplateId);
              if (!targetTemplate) {
                setPageError(`The selected template (ID: ${newResumeTemplateId}) could not be found.`);
                setPageIsLoading(false);
                return;
              }
            } catch (error) {
              console.error("ResumeEditorPage: Error fetching all templates: ", error);
              setPageError("Could not load templates list. Please try again.");
              setPageIsLoading(false);
              return;
            }
          } else {
            setPageError(`The selected template (ID: ${newResumeTemplateId}) could not be found.`);
            setPageIsLoading(false);
            return;
          }
        }

        if (targetTemplate) {
          if (targetTemplate.templateCode && targetTemplate.templateFieldDefinition) {
            setCurrentTemplateForEditor(targetTemplate);
            prepareNewResumeForEditor(targetTemplate);
            const initialData = initializeFormDataFromDefinitions(targetTemplate.templateFieldDefinition);
            setEditorFormData(initialData);
            setPageIsLoading(false);
          } else {
            setPageError(`Template (ID: ${newResumeTemplateId}) is missing essential code or field definitions.`);
            setPageIsLoading(false);
          }
        } else if (!isLoadingTemplatesContext) {
          setPageError(`The selected template (ID: ${newResumeTemplateId}) could not be found.`);
          setPageIsLoading(false);
        }
      } else {
        setPageError("Invalid page access. No template or resume specified.");
        setPageIsLoading(false);
      }
    };

    setupEditor();

    return () => {
      if (typeof clearCurrentEditorData === 'function') {
        clearCurrentEditorData();
      }
    };
  }, [
    existingResumeId,
    newResumeTemplateId,
    isAuthenticated,
    loadResumeForEditor,
    prepareNewResumeForEditor,
    getAllTemplatesFromContext,
    allTemplatesFromContext, // Fixed: Removed JSON.stringify
    isLoadingTemplatesContext
  ]);


  // Propagate resumeError from context to pageError
  useEffect(() => {
    if (resumeError) {
      setPageError(resumeError);
    }
  }, [resumeError, setPageError]); // Fixed: Added setPageError to dependencies


  const handleSimpleChange = useCallback((fieldPath, value) => {
    setEditorFormData(prevData => {
      const keys = fieldPath.split('.');
      let newFormData = { ...prevData };
      let currentLevel = newFormData;
      
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          currentLevel[key] = value;
        } else {
          currentLevel[key] = { ...(currentLevel[key] || {}) };
          currentLevel = currentLevel[key];
        }
      });
      
      // localStorage.setItem("draftForm", JSON.stringify(newFormData))
      return newFormData;
    });
  }, [setEditorFormData]);

  const handleArrayItemChange = useCallback((arrayPath, itemIndex, fieldName, value) => {
    setEditorFormData(prevData => {
      const newArray = JSON.parse(JSON.stringify(prevData[arrayPath] || []));
      if (newArray[itemIndex]) {
        newArray[itemIndex] = { ...newArray[itemIndex], [fieldName]: value };
      }
      const newFormData = { ...prevData, [arrayPath]: newArray}
      // localStorage.setItem('draftForm', JSON.stringify(newFormData))
      return newFormData
    });
  }, [setEditorFormData]);

  const handleAddItemToArray = useCallback((arrayPath) => {
    const groupDefinition = currentTemplateForEditor?.templateFieldDefinition?.find(
      (def) => def.name === arrayPath && def.type === 'group' && def.repeatable
    );
    const newItem = groupDefinition?.defaultItem ? { ...groupDefinition.defaultItem } : {};

    setEditorFormData(prevData => ({
      ...prevData,
      [arrayPath]: [...(prevData[arrayPath] || []), newItem],
    }));
    // localStorage.setItem('draftForm', JSON.stringify(editorFormData))
  }, [setEditorFormData, currentTemplateForEditor]);

  const handleRemoveItemFromArray = useCallback((arrayPath, index) => {
    setEditorFormData(prevData => {
      const currentArray = prevData[arrayPath] || [];
      if (index < 0 || index >= currentArray.length) return prevData;
      const newArray = [...currentArray];
      newArray.splice(index, 1);
      // const newFormData = {...prevData, [arrayPath]: newArray}
      return { ...prevData, [arrayPath]: newArray };
    });
  }, [setEditorFormData]);

  const handleSaveResume = async () => {
    if ((mode === 'create' && !currentTemplateForEditor?._id) || 
        (mode === 'edit' && !currentResumeDetail?._id)) {
      setPageError("Cannot save: Essential template or resume details are missing.");
      return;
    }

    let resumeNameToSave = currentResumeDetail?.resumeName;
    
    if (mode === 'create' && (!resumeNameToSave || resumeNameToSave.startsWith('My New'))) {
      const personalDetails = editorFormData.personalDetails || {};
      const userName = personalDetails.fullName || 
        (userData ? userData.userEmail.split('@')[0] : 'User');
      const templateNamePart = currentTemplateForEditor?.templateName || 'Resume';
      resumeNameToSave = `${userName}'s ${templateNamePart} Resume`;
    } else if (!resumeNameToSave) {
      resumeNameToSave = 'My Resume';
    }
  
    const savedResult = await saveOrUpdateCurrentResume(editorFormData, resumeNameToSave);
    if (savedResult && savedResult._id) {
      alert('Resume saved successfully!');
      if (mode === 'create') {
        navigate(`/resume/edit/${savedResult._id}`, { replace: true });
      }
    } else {
      alert('Failed to save resume. ' + (pageError || resumeError || 'Please check details.'));
    }
  };

  // const handleDownload = async () => {
  //   console.log(resumeRef.current)
  //   console.log(resumeRef.current.outerHTML)
  //   const resumeElement = resumeRef.current.outerHTML;
  //   if (!resumeElement) {
  //     alert('Error: Resume preview is not available. Please try again.'); // Fixed: Added user feedback
  //     return;
  //   }

  //   try {

  //   const canvas = await html2canvas(resumeElement, { scale: 3, useCORS: true });
  //   const imgData = canvas.toDataURL('image/png');
  //     const imgProps = {
  //       width: canvas.width,
  //       height: canvas.height
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
  //     const y = 10;

  //     pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
  //     const fileName = currentResumeDetail?.resumeName || 'My_Resume';
  //     pdf.save(`${fileName}.pdf`);
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     alert('Failed to download resume. Please try again.');
  //   }
  // };

  const handleResumeDownload = async () => {
    setdownloading(true)
    const resumeElement = resumeRef.current.outerHTML //outerHtml thing might have something to do with html2canvas interuption for css
    await downloadResume(resumeElement)
    setdownloading(false)
  }
 

  const templateCode = currentTemplateForEditor?.templateCode || '';
  const templateFieldDefinition = currentTemplateForEditor?.templateFieldDefinition || [];

  const displayName = mode === 'create' 
    ? `New ${currentTemplateForEditor?.templateName || 'Resume'}`
    : currentResumeDetail?.resumeName || 'Untitled Resume';

  const templateName = currentTemplateForEditor?.templateName || 'Unknown Template';

  if (isAuthenticated === null || pageIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-lg text-muted-foreground">Preparing Editor...</p>
        </div>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>{pageError}</AlertDescription>
            </Alert>
            <Button 
              className="w-full mt-4" 
              onClick={() => navigate(existingResumeId ? '/resumes' : '/templates')}
            >
              {existingResumeId ? 'Go to My Resumes' : 'Back to Templates'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode && (!currentTemplateForEditor || !templateFieldDefinition.length)) {
    if ((mode === 'create' && isLoadingTemplatesContext) || 
        (mode === 'edit' && isLoadingCurrentResume)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-lg text-muted-foreground">Loading Template Data...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>
                Unable to initialize editor: Template information or field definitions are missing.
              </AlertDescription>
            </Alert>
            <Button 
              className="w-full mt-4" 
              onClick={() => navigate('/templates')}
            >
              Return to Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!mode) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>Cannot determine editor mode. Invalid URL.</AlertDescription>
            </Alert>
            <Button 
              className="w-full mt-4" 
              onClick={() => navigate('/templates')}
            >
              Return to Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePreview = async () =>  {
    navigate(`/resume/view/${newResumeTemplateId ? newResumeTemplateId : existingResumeId}`)
  }

  return (
    <>
    {localStorageLoaded && 
      <div className="p-6 px-15 space-y-6 flex flex-col">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between"
        >
          <div className="flex items-center gap-3">
            <Button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition"
              onClick={() => navigate(existingResumeId ? '/dashboard' : '/templates')}
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </Button>
            <div className="flex flex-col items-start justify-between gap-1">
              <h2 className="text-xl font-bold">{displayName}</h2>
              <p className="text-sm text-muted-foreground">Template: {templateName}</p>
            </div>
          </div>

          <div className="flex gap-2 self-center">
            <Button
              variant="outline"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition cursor-pointer"
              onClick={handlePreview}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button
              variant="outline"
              onClick={handleResumeDownload}
              disabled={isSavingResume || isLoadingCurrentResume}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition cursor-pointer"
            >
              <Download className="w-4 h-4 mr-1" />
              {downlaoding ? 'Downloading...' : 'Download'}
            </Button>
            <Button
              onClick={handleSaveResume}
              disabled={isSavingResume || isLoadingCurrentResume}
              className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
            >
              {isSavingResume ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  {mode === 'create' ? 'Save New Resume' : 'Update Resume'}
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Card className="bg-white/70 backdrop-blur-md shadow-sm border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Resume Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <ResumeForm
                  templateFieldDefinition={templateFieldDefinition}
                  formData={editorFormData || {}}
                  onFormChange={handleSimpleChange}
                  onArrayChange={handleArrayItemChange}
                  onAddItem={handleAddItemToArray}
                  onRemoveItem={handleRemoveItemFromArray}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative border rounded-lg p-6 min-h-[500px] bg-white shadow-sm"
          >
            <div className="flex justify-end space-x-2 mb-2">
              <Button
                size="sm"
                variant="outline"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>
            <div className="h-full flex items-center justify-center">
              <ResumePreview
                ref={resumeRef}
                templateCode={templateCode}
                currentFormData={editorFormData}
              />
            </div>
          </motion.div>
        </div>
      </div>
}
    </>
      
  );
};

export default ResumeEditorPage;