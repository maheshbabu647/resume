import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema({
  templateName: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
  },
  templateCode: {
    type: String, // Stores HTML/JSX code
    required: [true, 'Template code is required'],
  },
  templateImage: {
    type: String, // URL from Cloudinary
    required: [true, 'Template image URL is required'],
  },
  templateImageId: {
    type: String,
    required : [true, 'Template image public id is required']
  },
  templateFieldDefinition: {
    type: mongoose.Schema.Types.Mixed,
    required : [true, 'Field definitions are required.'],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const templateModel = mongoose.model('Template', templateSchema)

export default templateModel