const User = require('../models/User');
const EmployeeProfile = require('../models/EmployeeProfile');
const bcrypt = require('bcryptjs');

// @desc    Get logged-in user's profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.UserId, {
      attributes: { exclude: ['PasswordHash', 'ResetPasswordToken', 'ResetPasswordExpire'] },
      include: [{
        model: EmployeeProfile,
        as: 'profile'
      }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { Email, EmployeeCode, ...profileData } = req.body;

    // Update user email if provided
    if (Email || EmployeeCode) {
      const user = await User.findByPk(req.user.UserId);
      if (Email) user.Email = Email;
      if (EmployeeCode) user.EmployeeCode = EmployeeCode;
      await user.save();
    }

    // Update employee profile if provided
    if (Object.keys(profileData).length > 0) {
      const profile = await EmployeeProfile.findOne({
        where: { UserId: req.user.UserId }
      });

      if (profile) {
        await profile.update(profileData);
      } else {
        await EmployeeProfile.create({
          UserId: req.user.UserId,
          ...profileData
        });
      }
    }

    // Fetch updated profile
    const updatedUser = await User.findByPk(req.user.UserId, {
      attributes: { exclude: ['PasswordHash', 'ResetPasswordToken', 'ResetPasswordExpire'] },
      include: [{
        model: EmployeeProfile,
        as: 'profile'
      }]
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Change password
// @route   POST /api/profile/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current password and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    // Get user
    const user = await User.findByPk(req.user.UserId);

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.PasswordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.PasswordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
