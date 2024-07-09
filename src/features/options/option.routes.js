import express from "express";
import { OptionController } from "./option.controller.js";

// Create a new express router instance
const router = express.Router();

// Create a new instance of the OptionController
const optionsController = new OptionController();

// Route to get all options
router.get("/", optionsController.getAllOptions);

// Route to get a specific option by ID
router.get("/:id", optionsController.getOptionById);

// Route to update a specific option by ID
router.put("/:id", optionsController.updateOptionById);

// Route to delete a specific option by ID
router.delete("/:id/delete", optionsController.deleteOptionById);

// Route to add a vote to a specific option by ID
router.get("/:id/add_vote", optionsController.addNewVoteToOptionById);

// Export the router to be used in other parts of the application
export default router;
