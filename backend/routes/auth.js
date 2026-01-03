const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { register, login, getMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter, passwordResetLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('EmployeeCode').notEmpty().withMessage('Employee code is required'),
  body('FullName').notEmpty().withMessage('Full name is required'),
  body('Email').isEmail().withMessage('Please provide a valid email'),
  body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('Role').optional().isIn(['ADMIN', 'EMPLOYEE']).withMessage('Invalid role')
];

const loginValidation = [
  body('Email').isEmail().withMessage('Please provide a valid email'),
  body('Password').notEmpty().withMessage('Password is required')
];

const forgotPasswordValidation = [
  body('Email').isEmail().withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
  body('Email').isEmail().withMessage('Please provide a valid email'),
  body('ResetToken').notEmpty().withMessage('Reset token is required'),
  body('NewPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Routes
router.post('/register', authLimiter, registerValidation, validate, register);
router.post('/login', authLimiter, loginValidation, validate, login);
router.get('/me', protect, getMe);
router.post('/forgot-password', passwordResetLimiter, forgotPasswordValidation, validate, forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
