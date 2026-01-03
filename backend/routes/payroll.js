const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const {
  getMyPayroll,
  getPayrollByUserId,
  getAllPayrolls,
  createOrUpdatePayroll,
  deletePayroll
} = require('../controllers/payrollController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const payrollValidation = [
  body('SalaryMonth').matches(/^\d{4}-\d{2}$/).withMessage('Salary month must be in YYYY-MM format'),
  body('BasicSalary').isNumeric().withMessage('Basic salary must be a number'),
  body('Allowances').optional().isNumeric().withMessage('Allowances must be a number'),
  body('Deductions').optional().isNumeric().withMessage('Deductions must be a number')
];

// Employee routes
router.get('/my', protect, getMyPayroll);

// Admin routes
router.get('/', protect, authorize('ADMIN'), getAllPayrolls);
router.get('/user/:userId', protect, authorize('ADMIN'), getPayrollByUserId);
router.post('/user/:userId', protect, authorize('ADMIN'), payrollValidation, validate, createOrUpdatePayroll);
router.delete('/:payrollId', protect, authorize('ADMIN'), deletePayroll);

module.exports = router;
