const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validator');
const {
  applyLeave,
  getMyLeaveRequests,
  getAllLeaveRequests,
  approveLeave,
  getLeaveById,
  getPendingLeaveRequests
} = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const applyLeaveValidation = [
  body('LeaveType').isIn(['PAID', 'SICK', 'UNPAID']).withMessage('Invalid leave type'),
  body('StartDate').isISO8601().withMessage('Invalid start date'),
  body('EndDate').isISO8601().withMessage('Invalid end date')
];

const approveLeaveValidation = [
  body('Status').isIn(['APPROVED', 'REJECTED']).withMessage('Status must be APPROVED or REJECTED')
];

// Employee routes
router.post('/apply', protect, applyLeaveValidation, validate, applyLeave);
router.get('/my', protect, getMyLeaveRequests);
router.get('/:leaveId', protect, getLeaveById);

// Admin/Manager routes
router.get('/', protect, authorize('ADMIN'), getAllLeaveRequests);
router.get('/pending', protect, authorize('ADMIN', 'MANAGER'), getPendingLeaveRequests);
router.put('/:leaveId/approve', protect, authorize('ADMIN'), approveLeaveValidation, validate, approveLeave);

module.exports = router;
