const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const { errorHandler, notFound } = require('./middleware/error');
const { apiLimiter } = require('./middleware/rateLimiter');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/leave', require('./routes/leave'));
app.use('/api/payroll', require('./routes/payroll'));

// Health check route
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'disconnected';
  }

  res.status(200).json({
    success: true,
    message: 'Dayflow HRMS API is running',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    version: '1.0.0'
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server  
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Test database connection 
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // Sync models (use { force: true } to drop and recreate tables)
    // await sequelize.sync({ force: true }); // WARNING: This will drop all tables
    await sequelize.sync({ alter: false }); // This will update tables to match models
    console.log('✅ Database models synced');
  } catch (dbError) {
    console.warn('⚠️  Database connection failed, but server will start anyway');
    console.warn('Database error:', dbError.message);
    console.warn('API endpoints will be available but database operations will fail');
  }

  // Start listening
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
    console.log(`💊 Health Check: http://localhost:${PORT}/api/health`);
  });
};

startServer();

module.exports = app;
