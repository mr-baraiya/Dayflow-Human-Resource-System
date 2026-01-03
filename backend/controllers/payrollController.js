const { Payroll, User } = require('../models');

// @desc    Get my payroll
// @route   GET /api/payroll/my
// @access  Private
exports.getMyPayroll = async (req, res) => {
  try {
    const { month } = req.query;
    const where = { UserId: req.user.UserId };

    if (month) {
      where.SalaryMonth = month;
    }

    const payrolls = await Payroll.findAll({
      where,
      order: [['SalaryMonth', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: payrolls.length,
      data: payrolls
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get payroll by user ID
// @route   GET /api/payroll/user/:userId
// @access  Private/Admin
exports.getPayrollByUserId = async (req, res) => {
  try {
    const { month } = req.query;
    const where = { UserId: req.params.userId };

    if (month) {
      where.SalaryMonth = month;
    }

    const payrolls = await Payroll.findAll({
      where,
      order: [['SalaryMonth', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: payrolls.length,
      data: payrolls
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all payrolls
// @route   GET /api/payroll
// @access  Private/Admin
exports.getAllPayrolls = async (req, res) => {
  try {
    const { month } = req.query;
    const where = {};

    if (month) {
      where.SalaryMonth = month;
    }

    const payrolls = await Payroll.findAll({
      where,
      include: [{
        model: User,
        attributes: ['UserId', 'EmployeeCode', 'FullName', 'Email']
      }],
      order: [['SalaryMonth', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: payrolls.length,
      data: payrolls
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create or update payroll
// @route   POST /api/payroll/user/:userId
// @access  Private/Admin
exports.createOrUpdatePayroll = async (req, res) => {
  try {
    const { SalaryMonth, BasicSalary, Allowances, Deductions } = req.body;

    const [payroll, created] = await Payroll.findOrCreate({
      where: {
        UserId: req.params.userId,
        SalaryMonth
      },
      defaults: {
        UserId: req.params.userId,
        SalaryMonth,
        BasicSalary,
        Allowances: Allowances || 0,
        Deductions: Deductions || 0
      }
    });

    if (!created) {
      // Update existing payroll
      payroll.BasicSalary = BasicSalary;
      payroll.Allowances = Allowances || 0;
      payroll.Deductions = Deductions || 0;
      await payroll.save();
    }

    res.status(created ? 201 : 200).json({
      success: true,
      message: `Payroll ${created ? 'created' : 'updated'} successfully`,
      data: payroll
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete payroll
// @route   DELETE /api/payroll/:payrollId
// @access  Private/Admin
exports.deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByPk(req.params.payrollId);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll not found'
      });
    }

    await payroll.destroy();

    res.status(200).json({
      success: true,
      message: 'Payroll deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
