const mongoose = require("mongoose");
// function generateRandomString(length) {
//   return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
// }

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
      type: Number,
      default: 0,
    },
  });
  
  const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
      },
    options: [optionSchema],
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "polls",
    },
  },{
    timestamps:true,
  });

const pollQuestion = mongoose.model("pollquestions", pollSchema);
module.exports = pollQuestion;