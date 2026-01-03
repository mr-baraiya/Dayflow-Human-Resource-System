const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboardStats,
  getTodayAttendance,
  getLeaveBalance,
  getAdminStats
} = require('../controllers/dashboardController');

router.use(protect);

router.get('/stats', getDashboardStats);
router.get('/attendance/today', getTodayAttendance);
router.get('/leave-balance', getLeaveBalance);

// Admin routes
router.get('/admin/stats', authorize('ADMIN', 'MANAGER'), getAdminStats);

module.exports = router;
