const bcrypt = require('bcryptjs');
const { User, EmployeeProfile } = require('../models');
const { sendTokenResponse } = require('../utils/auth');
const { sendPasswordResetEmail, sendPasswordResetSuccessEmail } = require('../utils/sendEmail');

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

// @desc    Forgot password - Generate reset token
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { Email } = req.body;

    if (!Email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    if (!user.IsActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive'
      });
    }

    // Generate reset token (random string)
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the token before storing in database
    const hashedToken = await bcrypt.hash(resetToken, 10);

    // Set token and expiry (15 minutes from now)
    user.ResetPasswordToken = hashedToken;
    user.ResetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    // Send password reset email
    try {
      await sendPasswordResetEmail(user, resetToken);
      
      res.status(200).json({
        success: true,
        message: 'Password reset email sent successfully. Please check your inbox.'
      });
    } catch (emailError) {
      // If email fails, clear the reset token
      user.ResetPasswordToken = null;
      user.ResetPasswordExpire = null;
      await user.save();

      console.error('Email sending error:', emailError);
      
      return res.status(500).json({
        success: false,
        message: 'Failed to send password reset email. Please try again later.'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error generating reset token'
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { Email, ResetToken, NewPassword } = req.body;

    // Validate input
    if (!Email || !ResetToken || !NewPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, reset token, and new password'
      });
    }

    if (NewPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { Email } });

    if (!user || !user.ResetPasswordToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Check if token has expired
    if (user.ResetPasswordExpire < new Date()) {
      user.ResetPasswordToken = null;
      user.ResetPasswordExpire = null;
      await user.save();

      return res.status(400).json({
        success: false,
        message: 'Reset token has expired. Please request a new one.'
      });
    }

    // Verify reset token
    const isValidToken = await bcrypt.compare(ResetToken, user.ResetPasswordToken);

    if (!isValidToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token'
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(NewPassword, salt);

    // Update password and clear reset token fields
    user.PasswordHash = newPasswordHash;
    user.ResetPasswordToken = null;
    user.ResetPasswordExpire = null;
    await user.save();

    // Send password reset success email
    try {
      await sendPasswordResetSuccessEmail(user);
    } catch (emailError) {
      console.error('Success email sending error:', emailError);
      // Don't fail the request if success email fails
    }

    res.status(200).json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
};
