const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  togglePublish
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

// ✅ PUBLIC
router.get('/', getBlogs);

// ✅ ADMIN (MUST BE ABOVE :slug)
router.get(
  '/admin',
  protect,
  authorize('admin', 'superadmin'),
  getAllBlogs
);

// ✅ PUBLIC (dynamic LAST)
router.get('/:slug', getBlogBySlug);

// ✅ ADMIN ACTIONS
router.post('/', protect, authorize('admin', 'superadmin'), createBlog);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateBlog);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteBlog);
router.put('/:id/like', protect, authorize('admin', 'superadmin'), likeBlog);
router.put('/:id/publish', protect, authorize('admin', 'superadmin'), togglePublish);

module.exports = router;
