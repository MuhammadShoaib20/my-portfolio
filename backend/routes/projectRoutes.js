const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  toggleFeatured
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id/like', likeProject); // 👈 public like

// Protected routes (admin & superadmin only)
router.post('/', protect, authorize('admin', 'superadmin'), createProject);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateProject);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteProject);
router.put('/:id/featured', protect, authorize('admin', 'superadmin'), toggleFeatured);

module.exports = router;