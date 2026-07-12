import { handleError } from '../utils/errorHandler.js';

export const errorMiddleware = (err, req, res, next) => {
  const error = handleError(err);
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    timestamp: error.timestamp,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
};
