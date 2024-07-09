import { QuestionRepository } from "./question.repository.js";

export class QuestionController {
  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  /**
   * Adds a new question to the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  addNewQuestion = async (req, res, next) => {
    try {
      const question = await this.questionRepository.add(req.body);
      res.status(201).json({
        success: true,
        message: "Question added successfully",
        question,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Retrieves a question by its ID from the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  getQuestionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const question = await this.questionRepository.get(id);
      res.status(200).json({ success: true, question });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Retrieves all questions from the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  getAllQuestions = async (req, res, next) => {
    try {
      const questions = await this.questionRepository.getAll();
      res.status(200).json({ success: true, questions });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Updates a question by its ID in the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  updateQuestionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedQuestion = await this.questionRepository.update(
        id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Question updated successfully",
        question: updatedQuestion,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Deletes a question by its ID from the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  deleteQuestionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await this.questionRepository.delete(id);
      res.status(200).json({
        success: true,
        message: "Question deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
