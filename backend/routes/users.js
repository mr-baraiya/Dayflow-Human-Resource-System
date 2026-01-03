const express = require('express');
const {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin only routes
router.get('/', protect, authorize('ADMIN'), getAllUsers);
router.get('/:id', protect, authorize('ADMIN'), getUserById);
router.put('/:id', protect, authorize('ADMIN'), updateUser);
router.put('/:id/status', protect, authorize('ADMIN'), updateUserStatus);

module.exports = router;
