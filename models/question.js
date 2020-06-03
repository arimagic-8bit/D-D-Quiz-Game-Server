const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = Schema({
  question: { type: String },
  picture: { type: String },
  answers: { type: [String] },
  correctAnswer: { type: Number },
  points: { type: Number },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
