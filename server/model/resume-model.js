import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: [true, 'User ID is required to associate the resume with a user.'],
    index: true,
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template', // Reference to the Template model
    required: [true, 'Template Id is required to associate the resume with a template.'],
    index: true
  },
  resumeName: {
    type: String,
    trim: true,
    maxlength: [100, 'Resume name cannot exceed 100 characters.']
  },
  resumeData: {
    type: mongoose.Schema.Types.Mixed, // Flexible structure for user input
    required: [true, "Resume data is required"],
    default: {}
  },
  },
  {
    timestamps : true,
  });


const resumeModel = mongoose.model('Resume', resumeSchema)

export default resumeModel