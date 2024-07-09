import { OptionsRepository } from "./option.repository.js";
import { QuestionRepository } from "../questions/question.repository.js";

export class OptionController {
  constructor() {
    this.optionsRepository = new OptionsRepository();
    this.questionRepository = new QuestionRepository();
  }

  /**
   * Adds a new option to a question and updates the question with the new option ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  addOption = async (req, res, next) => {
    try {
      const { id } = req.params;
      const optionBody = {
        text: req.body.text,
      };
      // Add new option
      const option = await this.optionsRepository.add(optionBody);

      // Update question with new option ID
      await this.questionRepository.updateWithNewOption(id, option._id);

      res
        .status(200)
        .json({ success: true, message: "Option added successfully", option });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Retrieves all options from the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  getAllOptions = async (req, res, next) => {
    try {
      const options = await this.optionsRepository.getAll();
      res.status(200).json({ success: true, options });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Retrieves a specific option by its ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  getOptionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const option = await this.optionsRepository.get(id);
      res.status(200).json({ success: true, option });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Updates a specific option by its ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  updateOptionById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedOption = await this.optionsRepository.update(id, req.body);
      res.status(200).json({
        success: true,
        message: "Option updated successfully",
        option: updatedOption,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Adds a new vote to a specific option by its ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  addNewVoteToOptionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const isVoteAdded = await this.optionsRepository.addVote(id);
      res
        .status(201)
        .json({ success: isVoteAdded, message: "voted successfully" });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Deletes a specific option by its ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   */
  deleteOptionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedOption = await this.optionsRepository.delete(id);
      res
        .status(200)
        .json({ success: true, message: "Option deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
