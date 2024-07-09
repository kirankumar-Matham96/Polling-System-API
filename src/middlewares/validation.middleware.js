import { body, validationResult } from "express-validator";
import { ApplicationError } from "./errorHandler.middleware.js";

export class Validations {
  /**
   * Middleware function to validate the 'title' field in a question creation request
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   */
  static questionValidation = async (req, res, next) => {
    try {
      // Check if the 'title' field is not empty and add an error message if it is
      await body("title").notEmpty().withMessage("title is required").run(req);

      // Collect validation results from the request object
      const validationResults = validationResult(req);

      // If there are validation errors, throw an ApplicationError with the first error message
      if (validationResults.array().length > 0) {
        throw new ApplicationError(validationResults.array()[0].msg, 400);
      }

      // If no validation errors, proceed to the next middleware function
      next();
    } catch (error) {
      // If there is an error, pass it to the next error handling middleware
      next(error);
    }
  };

  /**
   * Middleware function to validate the 'text' field in an option creation request
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   */
  static optionValidation = async (req, res, next) => {
    try {
      // Check if the 'text' field is not empty and add an error message if it is
      await body("text").notEmpty().withMessage("text is required").run(req);

      // Collect validation results from the request object
      const validationResults = validationResult(req);

      // If there are validation errors, throw an ApplicationError with the first error message
      if (validationResults.array().length > 0) {
        throw new ApplicationError(validationResults.array()[0].msg, 400);
      }

      // If no validation errors, proceed to the next middleware function
      next();
    } catch (error) {
      // If there is an error, pass it to the next error handling middleware
      next(error);
    }
  };
}
