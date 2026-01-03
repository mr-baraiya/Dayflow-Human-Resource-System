const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Payroll = sequelize.define('Payroll', {
  PayrollId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'PayrollId'
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
  SalaryMonth: {
    type: DataTypes.STRING(7), // YYYY-MM
    allowNull: false,
    field: 'SalaryMonth'
  },
  BasicSalary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'BasicSalary'
  },
  Allowances: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    field: 'Allowances'
  },
  Deductions: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    field: 'Deductions'
  },
  NetSalary: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'NetSalary'
  },
  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'CreatedAt'
  }
}, {
  tableName: 'Payroll',
  timestamps: false,
  hooks: {
    beforeSave: (payroll) => {
      // Calculate NetSalary
      payroll.NetSalary = parseFloat(payroll.BasicSalary) + 
                          parseFloat(payroll.Allowances) - 
                          parseFloat(payroll.Deductions);
    }
  }
});

// Define relationships
User.hasMany(Payroll, { foreignKey: 'UserId', as: 'payrolls' });
Payroll.belongsTo(User, { foreignKey: 'UserId' });

module.exports = Payroll;
