const bcrypt = require('bcryptjs');
const { User, EmployeeProfile } = require('../models');
const { sendTokenResponse } = require('../utils/auth');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { EmployeeCode, FullName, Email, Password, Role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      where: { Email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check if employee code exists
    const existingCode = await User.findOne({
      where: { EmployeeCode }
    });

    if (existingCode) {
      return res.status(400).json({
        success: false,
        message: 'Employee code already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const PasswordHash = await bcrypt.hash(Password, salt);

    // Create user
    const user = await User.create({
      EmployeeCode,
      FullName,
      Email,
      PasswordHash,
      Role: Role ? Role.toUpperCase() : 'EMPLOYEE',
      IsActive: true
    });

    // Create employee profile
    await EmployeeProfile.create({
      UserId: user.UserId
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Validate email & password
    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.IsActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive'
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(Password, user.PasswordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.UserId, {
      attributes: { exclude: ['PasswordHash'] },
      include: [{
        model: EmployeeProfile,
        as: 'profile'
      }]
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
