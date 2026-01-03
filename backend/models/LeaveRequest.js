const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const LeaveRequest = sequelize.define('LeaveRequest', {
  LeaveId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'LeaveId'
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'UserId'
    },
    field: 'UserId'
  },
  LeaveType: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['PAID', 'SICK', 'UNPAID']]
    },
    field: 'LeaveType'
  },
  StartDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'StartDate'
  },
  EndDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'EndDate'
  },
  Reason: {
    type: DataTypes.STRING(255),
    field: 'Reason'
  },
  Status: {
    type: DataTypes.STRING(20),
    defaultValue: 'PENDING',
    validate: {
      isIn: [['PENDING', 'APPROVED', 'REJECTED']]
    },
    field: 'Status'
  },
  ApprovedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'UserId'
    },
    field: 'ApprovedBy'
  },
  AdminComments: {
    type: DataTypes.STRING(255),
    field: 'AdminComments'
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'CreatedAt'
  }
}, {
  tableName: 'LeaveRequests',
  timestamps: false
});

// Define relationships
User.hasMany(LeaveRequest, { foreignKey: 'UserId', as: 'leaveRequests' });
LeaveRequest.belongsTo(User, { foreignKey: 'UserId', as: 'user' });
LeaveRequest.belongsTo(User, { foreignKey: 'ApprovedBy', as: 'approver' });

module.exports = LeaveRequest;
