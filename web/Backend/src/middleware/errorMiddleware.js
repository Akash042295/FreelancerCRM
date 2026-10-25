const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for development visibility
  console.error(err.stack);

  // Mongoose bad ObjectId error format catch
  if (err.name === 'CastError') {
    error.message = `Resource details not found with id of ${err.value}`;
    return res.status(404).json({ success: false, message: error.message });
  }

  // Mongoose duplicate database key field entry check
  if (err.code === 11000) {
    error.message = 'Duplicate field value entered into unique records system';
    return res.status(400).json({ success: false, message: error.message });
  }

  // Mongoose validation formatting error fallback
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({ success: false, message: error.message });
  }

  // Default Standard Server Error Status Code
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal Server Error instance occurred'
  });
};

export default errorHandler;
