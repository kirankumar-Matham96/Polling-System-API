import { OptionModel } from "./option.schema.js";
import { ApplicationError } from "../../middlewares/errorHandler.middleware.js";

export class OptionsRepository {
  /**
   * Adds a new option to the database
   * @param {Object} data - The data for the new option
   * @returns {Object} The saved option
   * @throws Will throw an error if saving fails
   */
  add = async (data) => {
    try {
      const option = new OptionModel(data);
      option.link_to_vote = `http://localhost:${process.env.PORT}/api/polling-system/options/${option._id}/add_vote`;
      return await option.save();
    } catch (error) {
      throw error;
    }
  };

  /**
   * Retrieves an option by its ID
   * @param {string} optionId - The ID of the option
   * @returns {Object} The option object
   * @throws Will throw an error if the option is not found or retrieval fails
   */
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

  /**
   * Retrieves all options from the database
   * @returns {Array} Array of all options
   * @throws Will throw an error if retrieval fails
   */
  getAll = async () => {
    try {
      return await OptionModel.find().populate("questionId");
    } catch (error) {
      throw error;
    }
  };

  /**
   * Updates an option by its ID
   * @param {string} optionId - The ID of the option to update
   * @param {Object} data - The new data for the option
   * @returns {Object} The updated option object
   * @throws Will throw an error if the option is not found or update fails
   */
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

  /**
   * Adds a vote to an option by its ID
   * @param {string} optionId - The ID of the option to add a vote to
   * @returns {boolean} True if the vote was added successfully
   * @throws Will throw an error if adding the vote fails
   */
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

  /**
   * Deletes an option by its ID
   * @param {string} optionId - The ID of the option to delete
   * @returns {Object} The deleted option object
   * @throws Will throw an error if the option is not found, has votes, or deletion fails
   */
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
