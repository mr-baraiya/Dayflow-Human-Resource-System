const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/profileController');
const { body } = require('express-validator');

router.use(protect);

router.get('/', getProfile);

router.put('/', [
  body('Email').optional().isEmail().withMessage('Please provide a valid email'),
  body('EmployeeCode').optional().trim().notEmpty().withMessage('Employee code cannot be empty')
], updateProfile);

router.post('/change-password', [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], changePassword);

module.exports = router;
