import { body, validationResult } from "express-validator";
import { ApplicationError } from "./errorHandler.middleware.js";

export class Validations {
  static questionValidation = async (req, res, next) => {
    try {
      await body("title").notEmpty().withMessage("title is required").run(req);

      const validationResults = validationResult(req);

      if (validationResults.array().length > 0) {
        throw new ApplicationError(validationResults.array()[0].msg, 400);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  static optionValidation = async (req, res, next) => {
    try {
      await body("text").notEmpty().withMessage("text is required").run(req);

      const validationResults = validationResult(req);

      if (validationResults.array().length > 0) {
        throw new ApplicationError(validationResults.array()[0].msg, 400);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
