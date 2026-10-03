const errorMiddleware = (error, req, res, next) => {
  console.log("Middleware error handling");

  const errorMessage = error.message || "something went wrong";
  const errorStatus = error.statusCode || 500;

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
};

export { errorMiddleware };
