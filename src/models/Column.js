const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  id: String,
  title: String,
  boardId: String,
  cardOrder: Array,
  cards: Array,
});

const Column = mongoose.model("columns", columnSchema);

module.exports = Column;
