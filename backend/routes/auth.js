const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

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

// Routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);

module.exports = router;
