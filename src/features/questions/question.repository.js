import { QuestionModel } from "./question.schema.js";

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
      const question = await QuestionModel.findByIdAndUpdate(
        questionId,
        data
      ).populate("options");
      if (!question) {
        throw new ApplicationError("question not found", 404);
      }

      return question;
    } catch (error) {
      throw error;
    }
  };

  delete = async (questionId) => {
    try {
      const question = await QuestionModel.findByIdAndDelete(questionId);
      if (!question) {
        throw new ApplicationError("question not found", 404);
      }
      return question;
    } catch (error) {
      throw error;
    }
  };
}
