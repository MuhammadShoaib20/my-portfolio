// backend/controllers/uploadController.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'No file data' });
    }

    console.log('Received image length:', image.length);
    console.log('First 100 chars:', image.substring(0, 100));

    // Fixed regex: added \. to support MIME types with dots (e.g. .docx, .xlsx)
    const matches = image.match(/^data:([A-Za-z0-9\-+\/\.]+);base64,(.+)$/);

    if (!matches) {
      console.error('Invalid base64 format');
      return res.status(400).json({ message: 'Invalid file data format' });
    }

    const mimeType = matches[1];
    console.log('Detected MIME type:', mimeType);

    const isPDF = mimeType === 'application/pdf';
    const isImage = mimeType.startsWith('image/');
    const isDocx =
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isDoc = mimeType === 'application/msword';
    const isXlsx =
      mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const isPptx =
      mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

    let uploadOptions = {
      folder: 'portfolio/resumes',
      type: 'upload',
    };

    if (isPDF) {
      uploadOptions.resource_type = 'image';
      uploadOptions.format = 'pdf';
    } else if (isImage) {
      uploadOptions.resource_type = 'image';
    } else if (isDocx || isDoc || isXlsx || isPptx) {
      // Office documents must be uploaded as 'raw' on Cloudinary
      uploadOptions.resource_type = 'raw';
    } else {
      uploadOptions.resource_type = 'raw';
    }

    console.log('Upload options:', uploadOptions);

    const result = await cloudinary.uploader.upload(image, uploadOptions);

    console.log('Upload successful:', result.secure_url);

    res.status(200).json({
      success: true,
      url: result.secure_url,
      fileType: result.format || mimeType,
      fileSize: result.bytes,
      resourceType: result.resource_type,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Upload failed',
    });
  }
};

module.exports = { uploadFile };