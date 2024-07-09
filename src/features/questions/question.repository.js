import { QuestionModel } from "./question.schema.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

export class QuestionRepository {
  /**
   * Adds a new question to the database
   * @param {Object} data - The data for the new question
   * @returns {Promise<Object>} The saved question document
   */
  add = async (data) => {
    try {
      const newQuestion = await QuestionModel(data);
      return newQuestion.save();
    } catch (error) {
      throw error;
    }
  };

  /**
   * Retrieves a question by its ID from the database
   * @param {String} questionId - The ID of the question to retrieve
   * @returns {Promise<Object>} The question document
   */
  get = async (questionId) => {
    try {
      const question = await QuestionModel.findById(questionId).populate(
        "options"
      );

      if (!question) {
        throw new ApplicationError("question not found", 404);
      }

      return question;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Retrieves all questions from the database
   * @returns {Promise<Array>} An array of all question documents
   */
  getAll = async () => {
    try {
      return await QuestionModel.find().populate("options");
    } catch (error) {
      throw error;
    }
  };

  /**
   * Updates a question by its ID in the database
   * @param {String} questionId - The ID of the question to update
   * @param {Object} data - The data to update the question with
   * @returns {Promise<Object>} The updated question document
   */
  update = async (questionId, data) => {
    try {
      const question = await QuestionModel.findByIdAndUpdate(questionId, data, {
        new: true,
        returnDocument: "after",
      }).populate("options");
      if (!question) {
        throw new ApplicationError("question not found", 404);
      }

      return question;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Updates a question by adding a new option to its options array
   * @param {String} questionId - The ID of the question to update
   * @param {String} optionId - The ID of the option to add
   * @returns {Promise<Object>} The updated question document
   */
  updateWithNewOption = async (questionId, optionId) => {
    try {
      return await QuestionModel.findByIdAndUpdate(
        questionId,
        { $push: { options: optionId } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  };

  /**
   * Deletes a question by its ID from the database
   * @param {String} questionId - The ID of the question to delete
   * @returns {Promise<Object>} The deleted question document
   */
  delete = async (questionId) => {
    try {
      const question = await QuestionModel.findById(questionId).populate(
        "options"
      );

      if (!question) {
        throw new ApplicationError("question not found", 404);
      }

      const isNotEligibleForDelete = question.options.some(
        (option) => option.votes > 0
      );

      if (isNotEligibleForDelete) {
        throw new ApplicationError(
          "Question has some voted options. Cannot delete this question!",
          403
        );
      }

      await QuestionModel.findByIdAndDelete(questionId);

      return question;
    } catch (error) {
      throw error;
    }
  };
}
