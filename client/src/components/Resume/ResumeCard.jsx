import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button/Button.jsx';
import styles from './ResumeCard.module.css';

const ResumeCard = ({ resume, onDelete }) => {
  const navigate = useNavigate();

  if (!resume) return null;

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

  const lastUpdatedDate = new Date(updatedAt || createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleEdit = () => {
    navigate(`/resume/edit/${_id}`);
  };

  const handleDeleteClick = () => {
    onDelete(_id);
  };

  return (
    <article className={styles.card} aria-labelledby={`resume-name-${_id}`}>
      <div className={styles.imagePlaceholder}>
        <img
          src={templateImage}
          alt={`${templateName} preview`}
          className={styles.resumeImage}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/400x300/E0E0E0/B0B0B0?text=Preview+Error';
          }}
        />
      </div>
      <div className={styles.cardContent}>
        <div>
          <h3 id={`resume-name-${_id}`} className={styles.resumeName}>
            {displayName}
          </h3>
          <p className={styles.templateInfo}>
            Template: {templateName}
          </p>
        </div>
        <div>
          <p className={styles.dateInfo}>
            Last updated: {lastUpdatedDate}
          </p>
          <div className={styles.actions}>
            <Button onClick={handleEdit} variant="secondary" size="sm">
              Edit
            </Button>
            <Button onClick={handleDeleteClick} variant="danger" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ResumeCard;
