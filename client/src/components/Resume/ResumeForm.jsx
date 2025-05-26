import React from 'react';
import get from 'lodash/get'
import Input from '../Common/Input/Input';
import Button from '../Common/Button/Button';
import styles from './ResumeForm.module.css';

const getValueFromPath = (dataObject, pathString) => {
  
    // if (!pathString) return undefined

    // const keys = pathString.split('.')
    // let result = dataObject
    // for (const key of keys){
    //   if (result && typeof result === 'object' && key in result) {
    //     result = result[key]
    //   }
    //   else {
    //     return undefined
    //   }
    // }
    // return result

    return get(dataObject, pathString, '')
}

const ResumeForm = ({
  templateFieldDefinition,
  formData,
  onFormChange,
  onArrayChange,
  onAddItem,
  onRemoveItem,
}) => {

  if (!Array.isArray(templateFieldDefinition) || templateFieldDefinition.length === 0) {
    return (
      <div className={styles.formSection}>
        <p>No form field have been defined for this template. Please check the template configuration.</p>
      </div>
    )
  }

  // console.log("Resume rendering with formData:", formData)
  // console.log("ResumeForm rendering with templateFieldDefinition:", templateFieldDefinition)

  return(
    <form className={styles.resumeForm} onSubmit={(e) => e.preventDefault()}>
      {templateFieldDefinition.map((fieldDef, index) => {

        const sectionKey = `${fieldDef.name}-${index}`

        
        if(fieldDef.type === 'group' && fieldDef.repeatable) {

          const itemsArray = formData[fieldDef.name] || []

          return (
            <section key={sectionKey} className={styles.formSection} aria-labelledby={`${fieldDef.name}-heading`}>
              
              <div className={styles.sectionTitle}>
                <h3 id={`${fieldDef.name}-heading`}>{fieldDef.label || fieldDef.name}</h3>
                <Button 
                  onClick={() => onAddItem(fieldDef.name)}  
                  type='button'
                  variant='secondary'
                  size='sm'
                >
                 + Add {fieldDef.label || 'Item'} 
                </Button>
              </div>

              <div className={styles.repeatableGroup}>
                {itemsArray.map((item, itemIndex) => (
                  <div key={`${fieldDef.name}-item-${itemIndex}`} className={styles.repeatableItem}>
                    <div className={styles.repeatableItemHeader}>
                      <h4>{fieldDef.label || 'Item'} #{itemIndex + 1}</h4>
                      <Button
                        onClick={() => onRemoveItem(fieldDef.name, itemIndex)}
                        type='button'
                        variant='danger'
                        size='sm'
                        aria-label={`Remove ${fieldDef.label || 'Item'} ${itemIndex + 1}`}
                      >
                        Remove
                      </Button>
                    </div>

                    {/* Render sub fields for this item */}
                    {Array.isArray(fieldDef.subFields) && fieldDef.subFields.map((subFieldDef, subFieldIndex) => {
                      const subFieldKey = `${fieldDef.name}-${itemIndex}-${subFieldDef.name}-${subFieldIndex}`
                      const subFieldValue = item[subFieldDef.name] || ''

                      return (
                        <div key={subFieldKey} className={styles.formFieldWrapper}>
                          <Input
                            id={subFieldKey.replace('.', '-')}
                            label={subFieldDef.label}
                            type={subFieldDef.type}
                            name={`${fieldDef.name}.${itemIndex}.${subFieldDef.name}`}
                            value={subFieldValue}
                            onChange={(e) => onArrayChange(fieldDef.name, itemIndex, subFieldDef.name, e.target.value)}
                            placeholder={subFieldDef.placeholder || ''}
                            required={subFieldDef.helperText || ''}
                            {...(subFieldDef.props || {})}
                          />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              <p><em>Repeatable group section for "{fieldDef.name}" will be implemented next.</em></p>
            </section>
          )
        }

        if(['text', 'email', 'tel', 'url', 'textarea'].includes(fieldDef.type)) {
          const fieldPath = fieldDef.name
          const value = getValueFromPath(formData, fieldPath)

          return (
            <div key={`${fieldPath}-${index}`} className={styles.formFieldWrapper}>
              <Input 
                id={fieldPath.replace('.', '-')}
                label={fieldDef.label}
                type={fieldDef.type}
                name={fieldPath}
                value={value}
                onChange={(e) => onFormChange(fieldPath, e.target.value)}
                placeholder={fieldDef.placeholder || ''}
                required={fieldDef.required || false}
                helperText={fieldDef.helperText || ''}
                {...(fieldDef.props || {})}
              />
            </div>
          )
        }
        
        const fieldPath = fieldDef.name
        const currentValue = getValueFromPath(formData, fieldPath)

        return(
          <div key={sectionKey} className={styles.formFieldWrapper}>
            <Input 
              id={fieldPath.replace('.', '-')}
              label={fieldDef.label}
              type={fieldDef.type}
              name={fieldPath}
              value={currentValue}
              onChange={(e) => onFormChange(fieldPath, e.target.value)}
              placeholder={fieldDef.placeholder || ''}
              required={fieldDef.placeholder || false}
              helperText={fieldDef.helperText || ''}
              {...Button(fieldDef.props || {})}
            />
          </div>
        )
        

      return <p key={`${fieldDef.name}-${index}`}>Unsupported field type: {fieldDef.type}</p>

      })}
    </form>
  ) 
}


export default ResumeForm



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


