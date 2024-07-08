import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 },
  link_to_vote: { type: String, required: true },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions"
  }
});

export const OptionModel = mongoose.model("Options", optionSchema);
