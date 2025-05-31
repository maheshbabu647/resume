import React, { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";

import resumeHtml from "@/utils/generateResumeHtml";

const ResumePreview = forwardRef(({ templateCode, currentFormData }, resumeRef) => {


  const previewHtmlContent = useMemo(() => {
    return resumeHtml(templateCode, currentFormData);
  }, [templateCode, currentFormData]);

  return (
<div className="w-full h-[calc(100vh-100px)] flex justify-center items-start bg-muted/40 rounded-xl border shadow-md overflow-auto">
  <div className="scale-[0.6] origin-top transform">
    <motion.div
      ref={resumeRef}
      className="bg-white shadow-lg rounded-md transition-all duration-300 ease-in-out"
      style={{ width: '794px', height: '1123px' }} // keep A4 size
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      dangerouslySetInnerHTML={{ __html: previewHtmlContent }}
      aria-live="polite"
      aria-label="Resume Preview"
    />
  </div>
</div>

);

});

export default ResumePreview;


