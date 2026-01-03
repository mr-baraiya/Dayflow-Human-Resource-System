const { User, EmployeeProfile } = require('../models');

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.UserId, {
      attributes: { exclude: ['PasswordHash'] },
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { Phone, Address, ProfilePicture } = req.body;

    const profile = await EmployeeProfile.findOne({
      where: { UserId: req.user.UserId }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Update allowed fields
    if (Phone !== undefined) profile.Phone = Phone;
    if (Address !== undefined) profile.Address = Address;
    if (ProfilePicture !== undefined) profile.ProfilePicture = ProfilePicture;

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['PasswordHash'] },
      include: [{
        model: EmployeeProfile,
        as: 'profile'
      }]
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['PasswordHash'] },
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user (Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  try {
    const { FullName, Department, Designation, DateOfJoining, IsActive } = req.body;

    const user = await User.findByPk(req.params.id, {
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

    // Update user fields
    if (FullName !== undefined) user.FullName = FullName;
    if (IsActive !== undefined) user.IsActive = IsActive;
    await user.save();

    // Update profile fields
    if (user.profile) {
      if (Department !== undefined) user.profile.Department = Department;
      if (Designation !== undefined) user.profile.Designation = Designation;
      if (DateOfJoining !== undefined) user.profile.DateOfJoining = DateOfJoining;
      await user.profile.save();
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
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
