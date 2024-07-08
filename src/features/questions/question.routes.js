import express from "express";
import { QuestionController } from "./question.controller.js";
import {OptionController} from "../options/option.controller.js";

const router = express.Router();
const questionController = new QuestionController();
const optionController = new OptionController();

router.post("/create", questionController.addNewQuestion);
router.post("/:id/options/create", optionController.addOption);
router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);
router.put("/:id", questionController.updateQuestionById);
router.delete("/:id/delete", questionController.deleteQuestionById);

export default router;
