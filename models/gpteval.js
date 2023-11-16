const mongoose = require("mongoose");

const GPTEvalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  calories: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Negative calories aren't real.");
    },
  },
});

const GPTEval = mongoose.model("GPTEval", GPTEvalSchema);

module.exports = GPTEval;
