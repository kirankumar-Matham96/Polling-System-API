/**
 * Custom error class extending the native Error class
 * Adds a statusCode property to the error object
 */
export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
  }
}

/**
 * Middleware function for handling errors
 * This function takes four parameters, which is typical for an Express error-handling middleware.
 * @param {Object} err - The error object, which may be an instance of ApplicationError or another error type.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */
export const errorHandlingMiddleware = (err, req, res, next) => {
  const errorMessage = err.message || "something went wrong";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, error: errorMessage });
};
