import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    link_to_vote: { type: String },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions",
    },
  },
  { versionKey: false }
);

export const OptionModel = mongoose.model("Options", optionSchema);
