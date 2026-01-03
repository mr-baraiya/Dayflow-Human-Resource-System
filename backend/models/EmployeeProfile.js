const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const EmployeeProfile = sequelize.define('EmployeeProfile', {
  ProfileId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ProfileId'
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
  Phone: {
    type: DataTypes.STRING(15),
    field: 'Phone'
  },
  Address: {
    type: DataTypes.STRING(255),
    field: 'Address'
  },
  Department: {
    type: DataTypes.STRING(50),
    field: 'Department'
  },
  Designation: {
    type: DataTypes.STRING(50),
    field: 'Designation'
  },
  DateOfJoining: {
    type: DataTypes.DATEONLY,
    field: 'DateOfJoining'
  },
  ProfilePicture: {
    type: DataTypes.STRING(255),
    field: 'ProfilePicture'
  }
}, {
  tableName: 'EmployeeProfiles',
  timestamps: false
});

// Define relationships
User.hasOne(EmployeeProfile, { foreignKey: 'UserId', as: 'profile' });
EmployeeProfile.belongsTo(User, { foreignKey: 'UserId' });

module.exports = EmployeeProfile;
