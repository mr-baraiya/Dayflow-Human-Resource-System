const express = require('express');
const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAttendanceByUserId,
  getAllAttendance,
  markAttendance
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Employee routes
router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);
router.get('/my', protect, getMyAttendance);

// Admin routes
router.get('/', protect, authorize('ADMIN'), getAllAttendance);
router.get('/user/:userId', protect, authorize('ADMIN'), getAttendanceByUserId);
router.post('/mark/:userId', protect, authorize('ADMIN'), markAttendance);

module.exports = router;
