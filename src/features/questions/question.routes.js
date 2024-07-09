import express from "express";
import { QuestionController } from "./question.controller.js";
import { OptionController } from "../options/option.controller.js";
import { Validations } from "../../middlewares/validation.middleware.js";

// Create a new router object
const router = express.Router();

// Initialize controllers
const questionController = new QuestionController();
const optionController = new OptionController();

// Route to create a new question
router.post(
  "/create",
  Validations.questionValidation,
  questionController.addNewQuestion
);

// Route to create a new option for a specific question
router.post(
  "/:id/options/create",
  Validations.optionValidation,
  optionController.addOption
);

// Route to get all questions
router.get("/", questionController.getAllQuestions);

// Route to get a specific question by ID
router.get("/:id", questionController.getQuestionById);

// Route to update a specific question by ID
router.put("/:id", questionController.updateQuestionById);

// Route to delete a specific question by ID
router.delete("/:id/delete", questionController.deleteQuestionById);

export default router;
