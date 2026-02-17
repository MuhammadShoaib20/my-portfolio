const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public route to get profile
router.get('/', getProfile);

// Admin only route to update profile
router.put('/', protect, authorize('admin', 'superadmin'), updateProfile);

module.exports = router;