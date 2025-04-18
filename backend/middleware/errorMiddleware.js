const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
