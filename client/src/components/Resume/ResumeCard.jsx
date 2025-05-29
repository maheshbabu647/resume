import { motion } from 'framer-motion';
import { FileText, Download, Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const ResumeCard = ({ resume, onDelete }) => {
  
  const navigate = useNavigate()

  const {
  _id,
  resumeName,
  templateId,
  updatedAt,
  createdAt
  } = resume;

  const displayName = resumeName || 'Resume (Untitled)';
  const templateImage = templateId?.templateImage || 'https://placehold.co/400x300/E0E0E0/B0B0B0?text=No+Preview';
  const templateName = templateId?.templateName || 'Unknown Template';
  
  const createdDate = new Date(createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  });

  const lastUpdatedDate = new Date(updatedAt || createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  });

  const handleEdit = () => {
    navigate(`/resume/edit/${_id}`);
  };

  const handleDeleteClick = async () => {
    await onDelete(_id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 hover:shadow-lg transition-shadow"
    >
      
      {/* Resume Details */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-800">{resumeName}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FileText size={16} />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FileText size={16} />
          <span>Modified: {lastUpdatedDate}</span>
        </div>
      </div>
      
      {/* Resume Preview Image */}
      <div className="relative w-full h-140 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={templateImage}
          alt="Resume Preview"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="default"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          onClick={handleEdit}
        >
          <Edit size={16} className="mr-2" />
          Edit
        </Button>
        <Button variant="outline" className="flex-1 cursor-pointer">
          <Download size={16} className="mr-2" />
          Download
        </Button>
        <Button variant="outline" className="text-red-600 hover:text-red-700 cursor-pointer" onClick={handleDeleteClick}>
          <Trash size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ResumeCard;