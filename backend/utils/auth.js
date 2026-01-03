const jwt = require('jsonwebtoken');

// Generate JWT Token
exports.generateToken = (userId, email, role) => {
  return jwt.sign(
    { id: userId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Response helper
exports.sendTokenResponse = (user, statusCode, res) => {
  const token = this.generateToken(user.UserId, user.Email, user.Role);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      UserId: user.UserId,
      EmployeeCode: user.EmployeeCode,
      FullName: user.FullName,
      Email: user.Email,
      Role: user.Role
    }
  });
};
