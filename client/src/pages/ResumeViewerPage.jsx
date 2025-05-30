import React, { useEffect, useRef, useState } from 'react';
import ResumePreview from '@/components/Resume/ResumePreview';
import { useParams } from 'react-router-dom';
import { getById } from '@/api/resumeServiceApi';
import useResumeContext from '@/hooks/useResume';

const ResumeViewerPage = () => {
  const { resumeId, templateId } = useParams();
  const resumeRef = useRef();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [a,sa] = useState(null)
  const [b,sb] = useState(null)

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

  useEffect(() => {

    if (resumeId) {
      async function getResume() {
        try {
          const response = await getById(resumeId);
          setResume(response);
        } catch (err) {
          console.error("Failed to fetch resume:", err);
        } finally {
          setLoading(false);
        }
      }
      getResume();
    }
    else if(templateId) {
      setLoading(false)
      sa(currentResumeDetail)
      sb(editorFormData)
    }
    
  }, [resumeId, templateId]);

  if (loading) return <div>Loading...</div>;
  if (!resume && !a) {
    return <div>Resume not found</div>;
  }

  return (
    <ResumePreview
      ref={resumeRef}
     
      templateCode={resume?.templateId.templateCode || a.templateId.templateCode}
      currentFormData={resume?.resumeData || b}
 

      
    />
  );
};

export default ResumeViewerPage;
