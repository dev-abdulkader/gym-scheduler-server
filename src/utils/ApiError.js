class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errorDetails = null,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errorDetails = errorDetails; // Contains detailed information about the error
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Static helper methods for specific error types
  static validationError(field, message) {
    return new ApiError(400, "Validation error occurred.", {
      field,
      message,
    });
  }

  static unauthorizedError(detailMessage) {
    return new ApiError(401, "Unauthorized access.", detailMessage);
  }
}

export { ApiError };
