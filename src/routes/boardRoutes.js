const express = require("express");
const {
  getAllBoard,
  postNewBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/boardController");
const router = express.Router();

router.post("/board", getAllBoard);
router.post("/add-board", postNewBoard);
router.post("/update-board", updateBoard);
router.post("/delete-board", deleteBoard);

module.exports = router;
