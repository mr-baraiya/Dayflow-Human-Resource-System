const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Attendance = sequelize.define('Attendance', {
  AttendanceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'AttendanceId'
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
  AttendanceDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'AttendanceDate'
  },
  CheckIn: {
    type: DataTypes.TIME,
    field: 'CheckIn'
  },
  CheckOut: {
    type: DataTypes.TIME,
    field: 'CheckOut'
  },
  Status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE']]
    },
    field: 'Status'
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'CreatedAt'
  }
}, {
  tableName: 'Attendance',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['UserId', 'AttendanceDate']
    }
  ]
});

// Define relationships
User.hasMany(Attendance, { foreignKey: 'UserId', as: 'attendances' });
Attendance.belongsTo(User, { foreignKey: 'UserId' });

module.exports = Attendance;
