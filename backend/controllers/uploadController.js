const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No file data' });

    // 🔁 FIXED: Capture any characters before ;base64,
    const matches = image.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) return res.status(400).json({ message: 'Invalid file data' });

    const mimeType = matches[1];
    const isPDF = mimeType === 'application/pdf';
    const isDoc = mimeType === 'application/msword';
    const isDocx = mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isImage = mimeType.startsWith('image/');

    let uploadOptions = {
      folder: 'portfolio/resumes',
      type: 'upload',
    };

    if (isPDF) {
      uploadOptions.resource_type = 'image';
      uploadOptions.format = 'pdf';
    } else if (isDoc || isDocx) {
      // Documents: use raw resource type and set format accordingly
      uploadOptions.resource_type = 'raw';
      if (isDoc) uploadOptions.format = 'doc';
      if (isDocx) uploadOptions.format = 'docx';
    } else if (isImage) {
      uploadOptions.resource_type = 'image';
    } else {
      uploadOptions.resource_type = 'raw';
    }

    const result = await cloudinary.uploader.upload(image, uploadOptions);

    // Determine the correct fileType for the response
    let fileType = result.format;
    if (isDoc) fileType = 'doc';
    if (isDocx) fileType = 'docx';

    res.status(200).json({
      success: true,
      url: result.secure_url,
      fileType: fileType,
      fileSize: result.bytes,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile };