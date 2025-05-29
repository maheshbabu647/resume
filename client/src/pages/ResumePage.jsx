// // src/pages/ResumesPage.js
// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation if needed
// import  useResumeContext from '../hooks/useResume.jsx'; // Your hook for ResumeContext
// import ResumeCard from '../components/Resume/ResumeCard.jsx'; // The card component we just made
// import LoadingSpinner from '../components/Common/LoadingSpinner/LoadingSpinner.jsx';
// import Button from '../components/Common/Button/Button.jsx';
// import styles from './ListPage.module.css'; // Shared styles for list pages

// const ResumesPage = () => {
//   const {
//     userResumesList,
//     isLoadingUserResumes,
//     resumesError, // Assuming your context exposes this for list fetching errors
//     loadUserResumes, // Function from context to fetch the list
//     deleteUserResumeById, // Function from context to delete a resume
//     isDeletingResume, // Optional: loading state for delete operation
//   } = useResumeContext();

//   const navigate = useNavigate();

//   // Fetch resumes when the component mounts
  // useEffect(() => {
  //   // console.log("ResumesPage: Attempting to load user resumes.");
  //   loadUserResumes();
  //   // Dependency array: loadUserResumes should be stable if memoized with useCallback in context.
  //   // If it's not stable and re-created on every context re-render, this could cause infinite loops
  //   // if it also updates a state that causes the context to re-render.
  //   // Assuming loadUserResumes is stable (properly memoized in context).
  // }, [loadUserResumes]);

//   const handleDeleteResume = async (resumeId, resumeName) => {
//     // Ask for confirmation before deleting
//     if (window.confirm(`Are you sure you want to delete "${resumeName || 'this resume'}"? This action cannot be undone.`)) {
//       // console.log(`ResumesPage: Attempting to delete resume ID ${resumeId}`);
//       const success = await deleteUserResumeById(resumeId); // Call context action
//       if (success) {
//         // alert('Resume deleted successfully.'); // Or use a more subtle notification
//         // The list userResumesList should update automatically from context state change
//       } else {
//         // Error should be set in context (resumesError) and can be displayed
//         alert('Failed to delete resume. ' + (resumesError || 'Please try again.'));
//       }
//     }
//   };

//   const handleCreateNew = () => {
//     navigate('/templates'); // Navigate to the template selection page
//   };

//   // --- Render Logic ---
//   let content;

//   if (isLoadingUserResumes) {
//     content = (
//       <div className={styles.centeredMessage}>
//         <LoadingSpinner size="large" label="Loading your resumes..." />
//       </div>
//     );
//   } else if (resumesError) {
//     content = (
//       <div className={`${styles.centeredMessage} ${styles.errorMessage}`}>
//         <p>Error: {resumesError}</p>
//         <p>Could not load your resumes. Please try refreshing the page.</p>
//       </div>
//     );
//   } else if (!userResumesList || userResumesList.length === 0) {
//     content = (
//       <div className={styles.centeredMessage}>
//         <p>You haven't created any resumes yet.</p>
//         <Button onClick={handleCreateNew} variant="primary" style={{ marginTop: 'var(--spacing-md)' }}>
//           Create Your First Resume
//         </Button>
//       </div>
//     );
//   } else {
//     content = (
//       <div className={styles.listGrid}>
//         {userResumesList.map((resume) => (
//           <ResumeCard
//             key={resume._id}
//             resume={resume}
//             onDelete={(id) => handleDeleteResume(id, resume.resumeName)} // Pass resumeName for confirm dialog
//             // Pass isDeletingResume if ResumeCard needs to show a loading state on its delete button
//             // isDeleting={isDeletingResume && currentlyDeletingId === resume._id} // More complex state needed for per-card delete loading
//           />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.listPageContainer}>
//       <header className={styles.listHeader}>
//         <h2>My Resumes</h2>
//         <Button onClick={handleCreateNew} variant="primary" iconLeft={<span>&#43;</span> /* Plus icon */}>
//           Create New Resume
//         </Button>
//       </header>
//       {content}
//     </div>
//   );
// };

// export default ResumesPage;

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input"; // shadcn input component
import { Button } from "@/components/ui/button"; // shadcn button component
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // shadcn tabs component
import ResumeCard from '@/components/Resume/ResumeCard';
import useResumeContext from '@/hooks/useResume';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const {
    userResumesList,
    isLoadingUserResumes,
    resumesError, // Assuming your context exposes this for list fetching errors
    loadUserResumes, // Function from context to fetch the list
    deleteUserResumeById, // Function from context to delete a resume
    isDeletingResume, // Optional: loading state for delete operation
  } = useResumeContext();

  const navigate = useNavigate()

  useEffect(() => {
    loadUserResumes();
  }, [loadUserResumes]);

  const handleDeleteResume = async (resumeId, resumeName) => {
  if (window.confirm(`Are you sure you want to delete "${resumeName || 'this resume'}"? This action cannot be undone.`)) {
    const success = await deleteUserResumeById(resumeId);
    if (success) {
      alert('Resume deleted successfully.'); // Or use a more subtle notification
    } 
    else {
      alert('Failed to delete resume. ' + (resumesError || 'Please try again.'));
    }
  
  }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="p-12">
        {/* Dashboard Title and Create Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
            <p className="text-gray-600">Manage your resumes and job application materials</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus size={16} className="mr-2" />
            Create New Resume
          </Button>
        </div>

        {/* Tabs and Search */}
        <div className="mb-6">
          <Tabs defaultValue="resumes" className="w-full">
            <TabsList className="grid w-[300px] grid-cols-3 pb-1 px-2 bg-gray-200">
              <TabsTrigger value="resumes" className='font-medium text-gray-400 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 whitespace-nowrap'>Resumes</TabsTrigger>
              <TabsTrigger value="cover-letters" className='font-medium text-gray-400 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 whitespace-nowrap'>Cover Letters</TabsTrigger>
              <TabsTrigger value="interviews" className='font-medium text-gray-400 hover:text-gray-900 data-[state=active]:text-gray-900 data-[state=active]:border-b-2 whitespace-nowrap'>Interviews</TabsTrigger>
            </TabsList>
          </Tabs>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <div className="relative w-full max-w-screen">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search resumes..."
                className="pl-10 w-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Resume Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {userResumesList.map((resume, index) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={(id) => handleDeleteResume(id, resume.resumeName)}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;