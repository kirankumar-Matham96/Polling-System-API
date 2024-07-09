import express from "express";
import { OptionController } from "./option.controller.js";

const router = express.Router();
const optionsController = new OptionController();

// router.post("/create", optionsController.addOption);
router.get("/", optionsController.getAllOptions);
router.get("/:id", optionsController.getOptionById);
router.put("/:id", optionsController.updateOptionById);
router.delete("/:id/delete", optionsController.deleteOptionById);
router.get("/:id/add_vote", optionsController.addNewVoteToOptionById);

export default router;
