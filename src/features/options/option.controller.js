import { OptionsRepository } from "./option.repository.js";
import { QuestionRepository } from "../questions/question.repository.js";

export class OptionController {
  constructor() {
    this.optionsRepository = new OptionsRepository();
    this.questionRepository = new QuestionRepository();
  }

  addOption = async (req, res, next) => {
    try {
      const { id } = req.params;
      const optionBody = {
        text: req.body.text,
      };
      // transaction here
      const option = await this.optionsRepository.add(optionBody);

      // updating question
      await this.questionRepository.updateWithNewOption(id, option._id);

      res
        .status(200)
        .json({ success: true, message: "Option added successfully", option });
    } catch (error) {
      next(error);
    }
  };

  getAllOptions = async (req, res, next) => {
    try {
      const options = await this.optionsRepository.getAll();
      res.status(200).json({ success: true, options });
    } catch (error) {
      next(error);
    }
  };

  getOptionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const option = await this.optionsRepository.get(id);
      res.status(200).json({ success: true, option });
    } catch (error) {
      next(error);
    }
  };

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
