const createError = require('http-errors');

/* Middleware to handle 404 errors */
const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Resource not found'));
};

/* Middleware to handle all errors */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
};

module.exports = {
    notFoundHandler,
    errorHandler
    };
