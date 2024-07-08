import { OptionModel, OptionsModel } from "./option.schema.js";

export class OptionsRepository {
  add = async (data) => {
    try {
      const option = new OptionModel(data);
      return await option.save();
    } catch (error) {
      throw error;
    }
  };

  get = async (optionId) => {
    try {
      const option = await OptionModel.findById(optionId).populate(
        "questionId"
      );
      if (!option) {
        throw new ApplicationError("option not found", 404);
      }
      return option;
    } catch (error) {
      throw error;
    }
  };

  getAll = async () => {
    try {
      return await OptionModel.find().populate("questionId");
    } catch (error) {
      throw error;
    }
  };

  update = async (optionId, data) => {
    try {
      const option = await OptionModel.findByIdAndUpdate(
        optionId,
        data
      ).populate("questionId");
      if (!option) {
        throw new ApplicationError("option not found", 404);
      }

      return option;
    } catch (error) {
      throw error;
    }
  };

  delete = async (optionId) => {
    try {
      const option = await OptionModel.findByIdAndDelete(optionId);
      if (!option) {
        throw new ApplicationError("option not found", 404);
      }
      return option;
    } catch (error) {
      throw error;
    }
  };
}
