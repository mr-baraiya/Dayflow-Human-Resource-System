const { Attendance, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Check-in
// @route   POST /api/attendance/checkin
// @access  Private
exports.checkIn = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      where: {
        UserId: req.user.UserId,
        AttendanceDate: today
      }
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Already checked in today'
      });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      UserId: req.user.UserId,
      AttendanceDate: today,
      CheckIn: new Date().toTimeString().split(' ')[0],
      Status: 'PRESENT'
    });

    res.status(201).json({
      success: true,
      message: 'Checked in successfully',
      data: attendance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Check-out
// @route   POST /api/attendance/checkout
// @access  Private
exports.checkOut = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({
      where: {
        UserId: req.user.UserId,
        AttendanceDate: today
      }
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: 'No check-in found for today'
      });
    }

    if (attendance.CheckOut) {
      return res.status(400).json({
        success: false,
        message: 'Already checked out'
      });
    }

    attendance.CheckOut = new Date().toTimeString().split(' ')[0];
    await attendance.save();

    res.status(200).json({
      success: true,
      message: 'Checked out successfully',
      data: attendance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get my attendance
// @route   GET /api/attendance/my
// @access  Private
exports.getMyAttendance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = { UserId: req.user.UserId };

    if (startDate) {
      where.AttendanceDate = { [Op.gte]: startDate };
    }
    if (endDate) {
      where.AttendanceDate = { ...where.AttendanceDate, [Op.lte]: endDate };
    }

    const attendances = await Attendance.findAll({
      where,
      order: [['AttendanceDate', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: attendances.length,
      data: attendances
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get attendance by user ID
// @route   GET /api/attendance/user/:userId
// @access  Private/Admin
exports.getAttendanceByUserId = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = { UserId: req.params.userId };

    if (startDate) {
      where.AttendanceDate = { [Op.gte]: startDate };
    }
    if (endDate) {
      where.AttendanceDate = { ...where.AttendanceDate, [Op.lte]: endDate };
    }

    const attendances = await Attendance.findAll({
      where,
      order: [['AttendanceDate', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: attendances.length,
      data: attendances
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all attendance
// @route   GET /api/attendance
// @access  Private/Admin
exports.getAllAttendance = async (req, res) => {
  try {
    const { date } = req.query;
    const where = {};

    if (date) {
      where.AttendanceDate = date;
    }

    const attendances = await Attendance.findAll({
      where,
      include: [{
        model: User,
        attributes: ['UserId', 'EmployeeCode', 'FullName', 'Email']
      }],
      order: [['AttendanceDate', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: attendances.length,
      data: attendances
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Mark attendance for user
// @route   POST /api/attendance/mark/:userId
// @access  Private/Admin
exports.markAttendance = async (req, res) => {
  try {
    const { AttendanceDate, CheckIn, CheckOut, Status } = req.body;

    const [attendance, created] = await Attendance.findOrCreate({
      where: {
        UserId: req.params.userId,
        AttendanceDate
      },
      defaults: {
        UserId: req.params.userId,
        AttendanceDate,
        CheckIn,
        CheckOut,
        Status
      }
    });

    if (!created) {
      // Update existing record
      attendance.CheckIn = CheckIn;
      attendance.CheckOut = CheckOut;
      attendance.Status = Status;
      await attendance.save();
    }

    res.status(created ? 201 : 200).json({
      success: true,
      message: `Attendance ${created ? 'created' : 'updated'} successfully`,
      data: attendance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
