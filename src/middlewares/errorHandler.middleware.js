export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
  }
}

export const errorHandlingMiddleware = (err, req, res, next) => {
  const errorMessage = err.message || "something went wrong";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, error: errorMessage });
};
