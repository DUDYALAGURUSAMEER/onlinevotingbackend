const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Date,
      required: true,
    },
    endduration: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "pollquestions",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("polls", pollSchema);
module.exports = Poll;
