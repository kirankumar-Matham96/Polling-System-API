import { QuestionRepository } from "./question.repository.js";

export class QuestionController {
  constructor() {
    this.questionRepository = new QuestionRepository();
  }

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

  getQuestionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const question = await this.questionRepository.get(id);
      res.status(200).json({ success: true, question });
    } catch (error) {
      next(error);
    }
  };

  getAllQuestions = async (req, res, next) => {
    try {
      const questions = await this.questionRepository.getAll();
      res.status(200).json({ success: true, questions });
    } catch (error) {
      next(error);
    }
  };

  updateQuestionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedQuestion = await this.questionRepository.update(
        id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "question updated successfully",
        question: updatedQuestion,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteQuestionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await this.questionRepository.delete(id);
      res.status(200).json({
        success: true,
        message: "question deletes successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
