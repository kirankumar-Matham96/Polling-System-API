import { OptionsRepository } from "./option.repository.js";

export class OptionController {
  constructor() {
    this.optionsRepository = new OptionsRepository();
  }

  addOption = async (req, res, next) => {
    try {
      const option = await this.optionsRepository.add(req.body);
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

      const updatedOption = await this.optionsRepository.updateOptionById(
        id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Option updated successfully",
        option: updatedOption,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOptionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedOption = await this.optionsRepository.deleteOptionById(id);
      res
        .status(200)
        .json({ success: true, message: "Option deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
