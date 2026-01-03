const User = require('../models/User');
const Attendance = require('../models/Attendance');
const LeaveRequest = require('../models/LeaveRequest');
const Payroll = require('../models/Payroll');
const { Op } = require('sequelize');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.UserId;
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Get today's attendance
    const todayAttendance = await Attendance.findOne({
      where: {
        UserId: userId,
        Date: {
          [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
          [Op.lt]: new Date(today.setHours(23, 59, 59, 999))
        }
      }
    });

    // Get this month's attendance count
    const monthAttendanceCount = await Attendance.count({
      where: {
        UserId: userId,
        Date: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfMonth
        }
      }
    });

    // Get pending leave requests
    const pendingLeaves = await LeaveRequest.count({
      where: {
        UserId: userId,
        Status: 'pending'
      }
    });

    // Get approved leaves this month
    const approvedLeavesThisMonth = await LeaveRequest.count({
      where: {
        UserId: userId,
        Status: 'approved',
        StartDate: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfMonth
        }
      }
    });

    // Get latest payroll
    const latestPayroll = await Payroll.findOne({
      where: { UserId: userId },
      order: [['PayrollMonth', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: {
        attendance: {
          today: todayAttendance ? {
            checkIn: todayAttendance.CheckInTime,
            checkOut: todayAttendance.CheckOutTime,
            status: todayAttendance.Status
          } : null,
          thisMonth: monthAttendanceCount
        },
        leaves: {
          pending: pendingLeaves,
          approvedThisMonth: approvedLeavesThisMonth
        },
        payroll: latestPayroll ? {
          month: latestPayroll.PayrollMonth,
          netSalary: latestPayroll.NetSalary
        } : null
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get today's attendance for user
// @route   GET /api/dashboard/attendance/today
// @access  Private
exports.getTodayAttendance = async (req, res) => {
  try {
    const today = new Date();
    const attendance = await Attendance.findOne({
      where: {
        UserId: req.user.UserId,
        Date: {
          [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
          [Op.lt]: new Date(today.setHours(23, 59, 59, 999))
        }
      },
      include: [{
        model: User,
        as: 'user',
        attributes: ['EmployeeCode', 'Email']
      }]
    });

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get leave balance for user
// @route   GET /api/dashboard/leave-balance
// @access  Private
exports.getLeaveBalance = async (req, res) => {
  try {
    const userId = req.user.UserId;
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    // Count approved leaves this year
    const usedLeaves = await LeaveRequest.sum('NumberOfDays', {
      where: {
        UserId: userId,
        Status: 'approved',
        StartDate: {
          [Op.gte]: startOfYear,
          [Op.lte]: endOfYear
        }
      }
    });

    // Assuming 20 days annual leave
    const totalLeaves = 20;
    const remainingLeaves = totalLeaves - (usedLeaves || 0);

    res.status(200).json({
      success: true,
      data: {
        total: totalLeaves,
        used: usedLeaves || 0,
        remaining: remainingLeaves,
        year: currentYear
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get admin dashboard statistics
// @route   GET /api/dashboard/admin/stats
// @access  Private (Admin/Manager only)
exports.getAdminStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Total employees
    const totalEmployees = await User.count({
      where: { IsActive: true }
    });

    // Today's attendance
    const todayAttendanceCount = await Attendance.count({
      where: {
        Date: {
          [Op.gte]: new Date(today.setHours(0, 0, 0, 0)),
          [Op.lt]: new Date(today.setHours(23, 59, 59, 999))
        }
      }
    });

    // Pending leave requests
    const pendingLeaveRequests = await LeaveRequest.count({
      where: { Status: 'pending' }
    });

    // This month's payroll processed
    const payrollProcessedCount = await Payroll.count({
      where: {
        PayrollMonth: {
          [Op.gte]: startOfMonth
        }
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        todayAttendance: {
          present: todayAttendanceCount,
          absent: totalEmployees - todayAttendanceCount
        },
        pendingLeaveRequests,
        payrollProcessed: payrollProcessedCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
