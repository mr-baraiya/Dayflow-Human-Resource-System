const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  null,
  null,
  {
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS',
        port: 1433
      }
    },
    host: 'localhost',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
