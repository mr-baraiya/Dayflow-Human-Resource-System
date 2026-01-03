const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'UserId'
  },
  EmployeeCode: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    field: 'EmployeeCode'
  },
  FullName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'FullName'
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'Email'
  },
  PasswordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'PasswordHash'
  },
  Role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'EMPLOYEE',
    validate: {
      isIn: [['ADMIN', 'EMPLOYEE']]
    },
    field: 'Role'
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'IsActive'
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'CreatedAt'
  },
  ResetPasswordToken: {
    type: DataTypes.STRING(255),
    field: 'ResetPasswordToken'
  },
  ResetPasswordExpire: {
    type: DataTypes.DATE,
    field: 'ResetPasswordExpire'
  }
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = User;
