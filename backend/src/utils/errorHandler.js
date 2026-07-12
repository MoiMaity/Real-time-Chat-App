export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

export const handleError = (error) => {
  console.error('Error:', error);
  
  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
      timestamp: error.timestamp
    };
  }

  return {
    success: false,
    message: error.message || 'An unexpected error occurred',
    statusCode: 500,
    timestamp: new Date().toISOString()
  };
};

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
