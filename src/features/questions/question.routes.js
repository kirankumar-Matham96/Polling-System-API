import express from "express";
import { QuestionController } from "./question.controller.js";

const router = express.Router();
const questionController = new QuestionController();

router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);
router.put("/:id", questionController.updateQuestionById);
router.delete("/:id", questionController.deleteQuestionById);

export default router;
