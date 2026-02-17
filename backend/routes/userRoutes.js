const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { 
  changePassword, 
  getUsers, 
  createUser, 
  deleteUser 
} = require('../controllers/userController');

// All routes below require authentication
router.use(protect);

// Password change (any authenticated user)
router.put('/password', changePassword);

// Superadmin only
router.get('/', authorize('superadmin'), getUsers);
router.post('/', authorize('superadmin'), createUser);
router.delete('/:id', authorize('superadmin'), deleteUser);

module.exports = router;