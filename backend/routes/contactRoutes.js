// ============================================
// IMPORT PACKAGES
// ============================================
const express = require('express');
const router = express.Router();

// Import controllers
const {
  sendMessage,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage
} = require('../controllers/contactController');

// Import middleware
const { protect, authorize } = require('../middleware/authMiddleware');

// ============================================
// ROUTES
// ============================================

// Public route
router.post('/', sendMessage);

// Protected routes (Admin or Superadmin only)
router.get('/', protect, authorize('admin', 'superadmin'), getAllMessages);
router.get('/:id', protect, authorize('admin', 'superadmin'), getMessageById);
router.put('/:id', protect, authorize('admin', 'superadmin'), updateMessageStatus);
router.delete('/:id', protect, authorize('admin', 'superadmin'), deleteMessage);

// ============================================
// EXPORT
// ============================================
module.exports = router;