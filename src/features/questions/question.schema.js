import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Options",
      },
    ],
  },
  { versionKey: false }
);

export const QuestionModel = mongoose.model("questions", questionSchema);
