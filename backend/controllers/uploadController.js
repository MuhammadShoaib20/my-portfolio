const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (credentials from environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No file data' });

    // Determine resource type from base64 MIME type
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches) return res.status(400).json({ message: 'Invalid file data' });

    const mimeType = matches[1];
    const isImage = mimeType.startsWith('image/');
    const resourceType = isImage ? 'image' : 'raw'; // PDF, DOC → raw

    const result = await cloudinary.uploader.upload(image, {
      folder: 'portfolio/resumes',
      resource_type: resourceType,
      access_mode: 'public',
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      fileType: result.format,
      fileSize: result.bytes,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile };