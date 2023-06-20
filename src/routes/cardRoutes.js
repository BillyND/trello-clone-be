const express = require("express");
const {
  postNewCard,
  updateCard,
  deleteCard,
  getAllCard,
  swapCard,
} = require("../controllers/cardController");
const router = express.Router();

router.post("/card", getAllCard);
router.post("/add-card", postNewCard);
router.post("/update-card", updateCard);
router.post("/delete-card", deleteCard);
router.post("/swap-card", swapCard);

module.exports = router;
