import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // Handle ApiError explicitly
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorDetails: err.errorDetails || null, // Include error details for validation errors
      data: null,
    });
  }

  // Handle other unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errorDetails: null,
    data: null,
  });
};
export { errorHandler };
