import React from 'react';
import { get } from 'lodash';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

const getValueFromPath = (dataObject, pathString) => {
  return get(dataObject, pathString, '');
};

const ResumeForm = ({
  templateFieldDefinition,
  formData,
  onFormChange,
  onArrayChange,
  onAddItem,
  onRemoveItem,
}) => {

//   const templateFieldDefinition = [
//   // Personal Info Section
//   {
//     section: 'personal',
//     name: 'fullName',
//     label: 'Full Name',
//     type: 'text',
//     placeholder: 'John Doe',
//     required: true,
//   },
//   {
//     section: 'personal',
//     name: 'email',
//     label: 'Email',
//     type: 'email',
//     placeholder: 'example@mail.com',
//     required: true,
//   },
//   {
//     section: 'personal',
//     name: 'phone',
//     label: 'Phone Number',
//     type: 'tel',
//     placeholder: '+91 9876543210',
//   },
//   {
//     section: 'personal',
//     name: 'linkedin',
//     label: 'LinkedIn URL',
//     type: 'url',
//     placeholder: 'https://linkedin.com/in/yourprofile',
//   },

//   // Experience Section (Repeatable)
//   {
//     section: 'experience',
//     name: 'workExperience',
//     label: 'Work Experience',
//     type: 'group',
//     repeatable: true,
//     subFields: [
//       {
//         name: 'company',
//         label: 'Company Name',
//         type: 'text',
//         placeholder: 'Google',
//         required: true,
//       },
//       {
//         name: 'position',
//         label: 'Position',
//         type: 'text',
//         placeholder: 'Software Engineer',
//       },
//       {
//         name: 'duration',
//         label: 'Duration',
//         type: 'text',
//         placeholder: 'Jan 2021 - Dec 2022',
//       },
//     ],
//   },

//   // Education Section (Repeatable)
//   {
//     section: 'education',
//     name: 'educationHistory',
//     label: 'Education',
//     type: 'group',
//     repeatable: true,
//     subFields: [
//       {
//         name: 'institution',
//         label: 'Institution',
//         type: 'text',
//         placeholder: 'IIT Madras',
//       },
//       {
//         name: 'degree',
//         label: 'Degree',
//         type: 'text',
//         placeholder: 'B.Tech in Computer Science',
//       },
//       {
//         name: 'year',
//         label: 'Graduation Year',
//         type: 'text',
//         placeholder: '2023',
//       },
//     ],
//   },

//   // Skills Section
//   {
//     section: 'skills',
//     name: 'skillsList',
//     label: 'Skills',
//     type: 'text',
//     placeholder: 'JavaScript, React, Python',
//   },

//   // Projects Section (Optional)
//   {
//     section: 'projects',
//     name: 'projectList',
//     label: 'Projects',
//     type: 'group',
//     repeatable: true,
//     subFields: [
//       {
//         name: 'title',
//         label: 'Project Title',
//         type: 'text',
//         placeholder: 'Resume Builder',
//       },
//       {
//         name: 'description',
//         label: 'Description',
//         type: 'text',
//         placeholder: 'A React app to generate resumes.',
//       },
//       {
//         name: 'link',
//         label: 'Project Link',
//         type: 'url',
//         placeholder: 'https://github.com/yourname/project',
//       },
//     ],
//   },

//   // Certificates Section (Optional)
//   {
//     section: 'certificates',
//     name: 'certificationList',
//     label: 'Certificates',
//     type: 'group',
//     repeatable: true,
//     subFields: [
//       {
//         name: 'title',
//         label: 'Certificate Title',
//         type: 'text',
//         placeholder: 'Machine Learning by Stanford',
//       },
//       {
//         name: 'issuer',
//         label: 'Issuer',
//         type: 'text',
//         placeholder: 'Coursera',
//       },
//       {
//         name: 'year',
//         label: 'Year',
//         type: 'text',
//         placeholder: '2022',
//       },
//     ],
//   },
// ];

  if (!Array.isArray(templateFieldDefinition) || templateFieldDefinition.length === 0) {
    return (
      <div className="p-4">
        <p className="text-sm text-gray-500">
          No form fields have been defined for this template. Please check the template configuration.
        </p>
      </div>
    );
  }

  const sections = templateFieldDefinition.reduce((acc, fieldDef) => {
    console.log(fieldDef)
    const section = fieldDef.section || 'personal';
    if (!acc[section]) acc[section] = [];
    acc[section].push(fieldDef);
    return acc;
  }, {});


  const tabCategories = [
    'personal',
    'experience',
    'education',
    'skills',
    'projects',
    'certificates',
  ];

  return (
    <div className="p-4">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="flex w-full border-b overflow-x-auto">
          {tabCategories.map((category, index) => (
            <TabsTrigger
              key={`tab-${category}-${index}`}
              value={category}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 whitespace-nowrap"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabCategories.map((category, sectionIndex) => (
          
          <TabsContent key={`content-${category}-${sectionIndex}`} value={category}>
            <div className="mt-6 space-y-6">
              {sections[category]?.map((fieldDef, index) => {
                const sectionKey = `${fieldDef.name}-${index}`;

                if (fieldDef.type === 'group' && fieldDef.repeatable) {
                  const itemsArray = formData[fieldDef.name] || [];

                  return (
                    <div key={sectionKey} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {fieldDef.label || fieldDef.name}
                        </h3>
                        <Button
                          onClick={() => onAddItem(fieldDef.name)}
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2 text-sm text-blue-600 border border-blue-600 hover:bg-blue-50"
                        >
                          <Plus className="w-4 h-4" />
                          Add {fieldDef.label || 'Item'}
                        </Button>
                      </div>

                      {itemsArray.map((item, itemIndex) => (
                        <div
                          key={`${fieldDef.name}-item-${itemIndex}`}
                          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
                        >
                          <div className="flex justify-end">
                            <Button
                              onClick={() => onRemoveItem(fieldDef.name, itemIndex)}
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-gray-500 hover:text-red-600"
                              aria-label={`Remove ${fieldDef.label || 'Item'} ${itemIndex + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.isArray(fieldDef.subFields) &&
                              fieldDef.subFields.map((subFieldDef, subFieldIndex) => {
                                const subFieldKey = `${fieldDef.name}-${itemIndex}-${subFieldDef.name}-${subFieldIndex}`;
                                const subFieldValue = item[subFieldDef.name] || '';

                                return (
                                  <div key={subFieldKey} className="space-y-1">
                                    <label
                                      htmlFor={subFieldKey.replace('.', '-')}
                                      className="text-sm font-medium text-gray-600"
                                    >
                                      {subFieldDef.label || subFieldDef.name}
                                    </label>
                                    <Input
                                      id={subFieldKey.replace('.', '-')}
                                      placeholder={subFieldDef.placeholder || ''}
                                      type={subFieldDef.type}
                                      name={`${fieldDef.name}.${itemIndex}.${subFieldDef.name}`}
                                      value={subFieldValue}
                                      onChange={(e) =>
                                        onArrayChange(
                                          fieldDef.name,
                                          itemIndex,
                                          subFieldDef.name,
                                          e.target.value
                                        )
                                      }
                                      required={subFieldDef.required || false}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                      {...(subFieldDef.props || {})}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (['text', 'email', 'tel', 'url', 'textarea'].includes(fieldDef.type)) {
                  const fieldPath = fieldDef.name;
                  const value = getValueFromPath(formData, fieldPath);

                  return (
                    <div key={sectionKey} className="space-y-1">
                      <label
                        htmlFor={fieldPath.replace('.', '-')}
                        className="text-sm font-medium text-gray-600"
                      >
                        {fieldDef.label || fieldDef.name}
                      </label>
                      <Input
                        id={fieldPath.replace('.', '-')}
                        placeholder={fieldDef.placeholder || ''}
                        type={fieldDef.type}
                        name={fieldPath}
                        value={value}
                        onChange={(e) => onFormChange(fieldPath, e.target.value)}
                        required={fieldDef.required || false}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        {...(fieldDef.props || {})}
                      />
                    </div>
                  );
                }

                const fieldPath = fieldDef.name;
                const currentValue = getValueFromPath(formData, fieldPath);

                return (
                  <div key={sectionKey} className="space-y-1">
                    <label
                      htmlFor={fieldPath.replace('.', '-')}
                      className="text-sm font-medium text-gray-600"
                    >
                      {fieldDef.label || fieldDef.name}
                    </label>
                    <Input
                      id={fieldPath.replace('.', '-')}
                      placeholder={fieldDef.placeholder || ''}
                      type={fieldDef.type}
                      name={fieldPath}
                      value={currentValue}
                      onChange={(e) => onFormChange(fieldPath, e.target.value)}
                      required={fieldDef.required || false}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      {...(fieldDef.props || {})}
                    />
                  </div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ResumeForm;



//   const personalDetails = formData.personalDetails || {};
//   const summary = formData.summary || '';
//   const experience = Array.isArray(formData.experience) ? formData.experience : [];
//   const education = Array.isArray(formData.education) ? formData.education : [];
//   const skills = formData.skills || '';

//   return (
//     <form className={styles.resumeForm} onSubmit={(e) => e.preventDefault()}>

//       <section className={styles.formSection} aria-labelledby="personal-details-heading">
//         <h3 id="personal-details-heading" className={styles.sectionTitle}>Personal Details</h3>
//         <Input
//           label="Full Name" id="fullName" type="text"
//           value={personalDetails.fullName || ''}
//           onChange={(e) => onFormChange('personalDetails', 'fullName', e.target.value)}
//           placeholder="e.g., Jane Doe"
//         />
//         <Input
//           label="Job Title / Desired Role" id="jobTitle" type="text"
//           value={personalDetails.jobTitle || ''}
//           onChange={(e) => onFormChange('personalDetails', 'jobTitle', e.target.value)}
//           placeholder="e.g., Software Engineer"
//         />
//         <div className={styles.inputRow}>
//           <Input
//             label="Email Address" id="email" type="email"
//             value={personalDetails.email || ''}
//             onChange={(e) => onFormChange('personalDetails', 'email', e.target.value)}
//           />
//           <Input
//             label="Phone Number" id="phone" type="tel"
//             value={personalDetails.phone || ''}
//             onChange={(e) => onFormChange('personalDetails', 'phone', e.target.value)}
//           />
//         </div>
//         <Input
//           label="LinkedIn Profile URL" id="linkedIn" type="url"
//           value={personalDetails.linkedIn || ''}
//           onChange={(e) => onFormChange('personalDetails', 'linkedIn', e.target.value)}
//         />
//         <Input
//           label="Portfolio/Website URL" id="portfolio" type="url"
//           value={personalDetails.portfolio || ''}
//           onChange={(e) => onFormChange('personalDetails', 'portfolio', e.target.value)}
//         />
//       </section>

//       <section className={styles.formSection} aria-labelledby="summary-heading">
//         <h3 id="summary-heading" className={styles.sectionTitle}>Professional Summary</h3>
//         <Input
//           id="summary" type="textarea"
//           value={summary}
//           onChange={(e) => onFormChange(null, 'summary', e.target.value)}
//           placeholder="Write a brief 2-4 sentence summary..."
//           rows={5}
//         />
//       </section>

//       <section className={styles.formSection} aria-labelledby="experience-heading">
//         <div className={styles.sectionTitle}>
//           <h3 id="experience-heading">Work Experience</h3>
//           <Button onClick={() => onAddItem('experience')} type="button" variant="secondary" size="sm">
//             + Add Experience
//           </Button>
//         </div>
//         <div className={styles.repeatableGroup}>
//           {experience.map((exp, index) => (
//             <div key={`exp-${index}`} className={styles.repeatableItem}>
//               <div className={styles.repeatableItemHeader}>
//                 <h4>Experience #{index + 1}</h4>
//                 <Button onClick={() => onRemoveItem('experience', index)} type="button" variant="danger" size="sm" aria-label={`Remove experience ${index + 1}`}>
//                   Remove
//                 </Button>
//               </div>
//               <Input
//                 label="Job Title" id={`expTitle-${index}`} type="text"
//                 value={exp.expTitle || ''}
//                 onChange={(e) => onArrayChange('experience', index, 'expTitle', e.target.value)}
//               />
//               <Input
//                 label="Company" id={`expCompany-${index}`} type="text"
//                 value={exp.company || ''}
//                 onChange={(e) => onArrayChange('experience', index, 'company', e.target.value)}
//               />
//               <Input
//                 label="Dates Employed" id={`expDates-${index}`} type="text"
//                 value={exp.dates || ''}
//                 onChange={(e) => onArrayChange('experience', index, 'dates', e.target.value)}
//                 placeholder="e.g., Jan 2020 - Present"
//               />
//               <Input
//                 label="Description/Responsibilities" id={`expDesc-${index}`} type="textarea"
//                 value={exp.description || ''}
//                 onChange={(e) => onArrayChange('experience', index, 'description', e.target.value)}
//                 rows={4}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className={styles.formSection} aria-labelledby="education-heading">
//         <div className={styles.sectionTitle}>
//           <h3 id="education-heading">Education</h3>
//           <Button onClick={() => onAddItem('education')} type="button" variant="secondary" size="sm">
//             + Add Education
//           </Button>
//         </div>
//         <div className={styles.repeatableGroup}>
//           {education.map((edu, index) => (
//             <div key={`edu-${index}`} className={styles.repeatableItem}>
//               <div className={styles.repeatableItemHeader}>
//                 <h4>Education #{index + 1}</h4>
//                 <Button onClick={() => onRemoveItem('education', index)} type="button" variant="danger" size="sm" aria-label={`Remove education ${index + 1}`}>
//                   Remove
//                 </Button>
//               </div>
//               <Input
//                 label="Degree / Certificate" id={`eduDegree-${index}`} type="text"
//                 value={edu.degree || ''}
//                 onChange={(e) => onArrayChange('education', index, 'degree', e.target.value)}
//               />
//               <Input
//                 label="School / Institution" id={`eduSchool-${index}`} type="text"
//                 value={edu.school || ''}
//                 onChange={(e) => onArrayChange('education', index, 'school', e.target.value)}
//               />
//               <Input
//                 label="Graduation Date / Period" id={`eduDates-${index}`} type="text"
//                 value={edu.dates || ''}
//                 onChange={(e) => onArrayChange('education', index, 'dates', e.target.value)}
//                 placeholder="e.g., May 2022 or 2018 - 2022"
//               />
//               <Input
//                 label="Details (GPA, Honors, Relevant Coursework)" id={`eduDetails-${index}`} type="textarea"
//                 value={edu.details || ''}
//                 onChange={(e) => onArrayChange('education', index, 'details', e.target.value)}
//                 rows={3}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className={styles.formSection} aria-labelledby="skills-heading">
//         <h3 id="skills-heading" className={styles.sectionTitle}>Skills</h3>
//         <Input
//           id="skillsSummary" type="textarea"
//           value={skills}
//           onChange={(e) => onFormChange(null, 'skills', e.target.value)}
//           placeholder="List your key skills, e.g., JavaScript, React, Node.js, Project Management, Team Leadership..."
//           rows={5}
//           helperText="Enter skills separated by commas, or as bullet points. This will be a single block of text in most templates."
//         />
//       </section>

//     </form>
//   );
// };


