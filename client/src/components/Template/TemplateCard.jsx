// import React from "react";
// import { Link } from 'react-router-dom'
// import Button from "../Common/Button/Button.jsx";
// import styles from './TemplateCard.module.css'

// const TemplateCard = ({ template }) => {

//     if(!template) {
//         return null
//     }

//     const fallbackImage = 'https://placehold.co/300x400/E0E0E0/B0B0B0?text=No+Preview'

//     const imageUrl = template.templateImage && typeof template.templateImage === 'string'
//     ? template.templateImage
//     : fallbackImage

//     return (
//         <article className = {styles.card} aria-labelledby={`template-name-${template._id}`}>
            
//             <div className = {styles.imageContainer}>
//                 <img
//                     src = {imageUrl}
//                     alt = {`${template.templatename || 'unnamed template'} preview`}
//                     className = {styles.templateImage}
//                     loading="lazy"
//                     onError = {(e) => {
//                         e.target.onerror = null
//                         e.target.src = fallbackImage
//                     }}
//                 />
//             </div>

//             <div className = {styles.cardContent}>
//                 <h3 id = {`template-name-${template._id}`} className = {styles.temlateName}>
//                     {template.templateName || 'Unnamed Template'}
//                 </h3>

//                 <Link to = {`/resume/new/${template._id}`} className = {styles.useButtonLink}>
//                     <Button variant='primary' size='sm' className = {styles.useButton}>
//                         Use This Template
//                     </Button>
//                 </Link>
//             </div>
            
//         </article>
//     )
// }

// export default TemplateCard

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template }) => {

  const navigate = useNavigate()

    if (!template) {
        return null
    }

    const fallbackImage = 'https://placehold.co/300x400/E0E0E0/B0B0B0?text=No+Preview'

    const imageURl = template.templateImage && typeof template.templateImage === 'string'
    ? template.templateImage
    : fallbackImage

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 "
    >
      {/* Template Title */}
      <h3 className="text-lg font-semibold text-gray-800">{template.templateName}</h3>

      {/* Preview Image */}
      <div className="relative w-full h-140 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={imageURl}
          alt={`${template.templateName} Preview`}
          className="w-full h-full object-cover"
        />
        <Button
          variant="outline"
          className="absolute top-2 left-2 bg-white/80 hover:bg-white cursor-pointer"
        >
          <Eye size={16} className="mr-2" />
          View
        </Button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">"Desciption of template"</p>

      {/* Features List */}
      {/* <ul className="text-sm text-blue-600 space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span>✔</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul> */}

      {/* Use This Template Button */}
      <Link to={`/resume/new/${template._id}`}>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            Use This Template
            <span className="ml-2">→</span>
        </Button>
      </Link>
    </motion.div>
  );
};

export default TemplateCard;