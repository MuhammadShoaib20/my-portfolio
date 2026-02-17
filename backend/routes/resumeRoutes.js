const express = require('express');
const router = express.Router();
const {
  getAllResumes,
  getActiveResumes,
  createResume,
  updateResume,
  deleteResume,
  toggleResumeActive,
  downloadResume,
} = require('../controllers/resumeController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/active', getActiveResumes);
router.get('/download/:id', downloadResume); // 👈 new download route

// Admin routes (protected)
router.get('/', protect, authorize('admin', 'superadmin'), getAllResumes);
router.post('/', protect, authorize('admin', 'superadmin'), createResume);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateResume);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteResume);
router.put('/:id/toggle', protect, authorize('admin', 'superadmin'), toggleResumeActive);

module.exports = router;