const errorHandler = (err, req, res, _next) => {
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message || 'Unknown error',
  });
};

export default errorHandler;
