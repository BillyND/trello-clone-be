const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  id: String,
  title: String,
  columnId: String,
  boardId: String,
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
