const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('admin', 'superadmin'), uploadFile);

module.exports = router;