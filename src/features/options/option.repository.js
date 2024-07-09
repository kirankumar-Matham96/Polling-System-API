import { OptionModel } from "./option.schema.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

export class OptionsRepository {
  add = async (data) => {
    try {
      const option = new OptionModel(data);
      option.link_to_vote = `http://localhost:${process.env.PORT}/api/polling-system/options/${option._id}/add_vote`;
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

  addVote = async (optionId) => {
    try {
      const response = await OptionModel.findByIdAndUpdate(optionId, {
        $inc: { votes: 1 },
      });
      return true;
    } catch (error) {
      throw error;
    }
  };

  delete = async (optionId) => {
    try {
      const option = await OptionModel.findById(optionId);

      if (!option) {
        throw new ApplicationError("option not found", 404);
      }

      if (option.votes > 0) {
        throw new ApplicationError(
          "Option has votes. This option cannot be deleted.",
          403
        );
      }

      await OptionModel.findByIdAndDelete(optionId);
      return option;
    } catch (error) {
      throw error;
    }
  };
}
