import { QuestionModel } from "./question.schema.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

export class QuestionRepository {
  add = async (data) => {
    try {
      const newQuestion = await QuestionModel(data);
      return newQuestion.save();
    } catch (error) {
      throw error;
    }
  };

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

  getAll = async () => {
    try {
      return await QuestionModel.find().populate("options");
    } catch (error) {
      throw error;
    }
  };

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
