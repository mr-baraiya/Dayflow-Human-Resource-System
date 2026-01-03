// Error handler middleware
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Not found handler
exports.notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};
