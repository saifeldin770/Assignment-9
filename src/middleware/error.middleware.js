async function globalErrorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode?.cause || 400;
  res.status(statusCode).json({
    errorMsg: error.message,
    errorStack: error.stack,
    error,
    extra: error.cause,
  });
}
export default globalErrorMiddleware;
