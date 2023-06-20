const express = require("express");
const {
  postNewColumn,
  updateColumn,
  deleteColumn,
  getAllColumn,
} = require("../controllers/columnController");
const router = express.Router();

router.post("/column", getAllColumn);
router.post("/add-column", postNewColumn);
router.post("/update-column", updateColumn);
router.post("/delete-column", deleteColumn);

module.exports = router;
