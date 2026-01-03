const { LeaveRequest, User } = require('../models');

// @desc    Apply for leave
// @route   POST /api/leave/apply
// @access  Private
exports.applyLeave = async (req, res) => {
  try {
    const { LeaveType, StartDate, EndDate, Reason } = req.body;

    // Validate dates
    if (new Date(EndDate) < new Date(StartDate)) {
      return res.status(400).json({
        success: false,
        message: 'End date cannot be before start date'
      });
    }

    const leaveRequest = await LeaveRequest.create({
      UserId: req.user.UserId,
      LeaveType: LeaveType.toUpperCase(),
      StartDate,
      EndDate,
      Reason,
      Status: 'PENDING'
    });

    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: leaveRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get my leave requests
// @route   GET /api/leave/my
// @access  Private
exports.getMyLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.findAll({
      where: { UserId: req.user.UserId },
      include: [{
        model: User,
        as: 'approver',
        attributes: ['UserId', 'FullName', 'Email']
      }],
      order: [['CreatedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: leaveRequests.length,
      data: leaveRequests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all leave requests
// @route   GET /api/leave
// @access  Private/Admin
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};

    if (status) {
      where.Status = status.toUpperCase();
    }

    const leaveRequests = await LeaveRequest.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['UserId', 'EmployeeCode', 'FullName', 'Email']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['UserId', 'FullName', 'Email']
        }
      ],
      order: [['CreatedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: leaveRequests.length,
      data: leaveRequests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Approve/Reject leave request
// @route   PUT /api/leave/:leaveId/approve
// @access  Private/Admin
exports.approveLeave = async (req, res) => {
  try {
    const { Status, AdminComments } = req.body;

    const leaveRequest = await LeaveRequest.findByPk(req.params.leaveId);

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    if (leaveRequest.Status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message: 'Leave request has already been processed'
      });
    }

    leaveRequest.Status = Status.toUpperCase();
    leaveRequest.ApprovedBy = req.user.UserId;
    leaveRequest.AdminComments = AdminComments;

    await leaveRequest.save();

    res.status(200).json({
      success: true,
      message: `Leave request ${Status.toLowerCase()} successfully`,
      data: leaveRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get leave request by ID
// @route   GET /api/leave/:leaveId
// @access  Private
exports.getLeaveById = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByPk(req.params.leaveId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['UserId', 'EmployeeCode', 'FullName', 'Email']
        },
        {
          model: User,
          as: 'approver',
          attributes: ['UserId', 'FullName', 'Email']
        }
      ]
    });

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // Check if user is authorized
    if (req.user.Role !== 'ADMIN' && leaveRequest.UserId !== req.user.UserId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this leave request'
      });
    }

    res.status(200).json({
      success: true,
      data: leaveRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get pending leave requests (for managers/admin)
// @route   GET /api/leave/pending
// @access  Private (Manager/Admin only)
exports.getPendingLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.findAll({
      where: { Status: 'PENDING' },
      include: [{
        model: User,
        as: 'user',
        attributes: ['UserId', 'EmployeeCode', 'Email', 'Role']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: leaveRequests.length,
      data: leaveRequests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
