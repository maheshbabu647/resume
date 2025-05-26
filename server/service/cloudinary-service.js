import path from 'path'
import crypto from 'crypto'
import cloudinary from '../config/cloudinary-config.js'

const uploadImageToCloudinary = async (fileBuffer, originalFileName, folderName = 'resume_templates_previews') => {

    return new Promise((resolve, reject) => {
      
    if(!fileBuffer) {
        throw new Error('File buffer is required for upload.')
    }

    if(!originalFileName) {
        throw new Error('Original file name is required for upload')
    }

    const fileNameWithoutExt = path.parse(originalFileName).name;
    const uniquePublicId = `${fileNameWithoutExt}_${crypto.randomUUID()}`

    const uploadStream = cloudinary.uploader.upload_stream(
        {
            folder: folderName,
            public_id: uniquePublicId,
            resource_type: 'auto', 
        },
      
        (error, result) => {
            if (error) {
                console.error('Cloudinar upoad Error', error)
                return reject(new Error('Image upload to cloudinary failed'))
            }
            if (!result || !result.secure_url) {
                console.error('Cloudinary Upload Error: No result/URL.', result);
                return reject(new Error('Invalid upload result from Cloudinary.'));
            }
            resolve({secure_url: result.secure_url, public_id: result.public_id})
        }
    )
    uploadStream.end(fileBuffer)
})
} 


const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) {
    throw new Error('Public ID is required to delete an image.');
  }

  const result = await cloudinary.uploader.destroy(publicId);
  return result;
};

export {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
};