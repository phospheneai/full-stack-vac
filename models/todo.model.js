const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  body: String,
  isCompleted: {
    type: Boolean,
    isRequired: true,
    default: false,
  },
});

module.exports = mongoose.model("todos", todoSchema);
