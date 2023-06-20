const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  id: String,
  title: String,
  columnOrder: Array,
  columns: Array,
});

const Board = mongoose.model("boards", boardSchema);

module.exports = Board;
