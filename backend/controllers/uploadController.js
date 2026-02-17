const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (credentials from .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No file data' });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: 'portfolio/resumes',        // optional folder
      resource_type: 'auto',               // auto-detect PDF, image, etc.
    });

    res.status(200).json({
      success: true,
      url: result.secure_url,
      fileType: result.format,              // e.g., 'pdf'
      fileSize: result.bytes,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile };