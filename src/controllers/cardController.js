const Board = require("../models/Board");
const Card = require("../models/Card");
const Column = require("../models/Column");
const { pushCardOrder } = require("./columnController");

const getAllCard = async (req, res) => {
  const boardId = req.body.boardId;
  try {
    const resAllCard = await Card.find({});

    return res.status(200).json({
      errorCode: 0,
      message: "Get all card success!",
      data: resAllCard,
    });
  } catch (error) {
    return res.status(200).json({
      errorCode: 1,
      message: String(error),
    });
  }
};

const postNewCard = async (req, res) => {
  const cardId = req.body.id;
  const title = req.body.title;
  const columnId = req.body.columnId;
  const boardId = req.body.boardId;

  const options = {
    id: cardId,
    title: title,
    columnId: columnId,
    boardId: boardId,
  };

  if (!cardId.trim() || !title.trim() || !columnId.trim() || !boardId.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resPostCard = await Card.create(options);
      const resPushCardOrder = await pushCardOrder(columnId, cardId);
      return res.status(200).json({
        errorCode: 0,
        message: "Create Card success!",
        data: options,
      });
    } catch (error) {
      return res.status(200).json({
        errorCode: 1,
        message: String(error),
      });
    }
  }
};

const updateCard = async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const options = {
    id: id,
    title: title,
  };

  if (!id.trim() || !title.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resPutCard = await Card.updateOne({ id: id }, options);
      return res.status(200).json({
        errorCode: 0,
        message: "Update card success!",
        data: resPutCard,
      });
    } catch (error) {
      return res.status(200).json({
        errorCode: 1,
        message: String(error),
      });
    }
  }
};

const deleteCard = async (req, res) => {
  const id = req.body.id;
  const columnId = req.body.columnId;
  const cardOrder = req.body.cardOrder;

  if (!id.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resFindOne = await Card.findOne({ id: id });
      const resDelete = await Card.deleteOne({ id: id });
      const resUpdateOrder = await Column.updateOne(
        { id: columnId },
        { cardOrder: cardOrder }
      );

      return res.status(200).json({
        errorCode: 0,
        message: "Delete card success!",
        data: resFindOne,
      });
    } catch (error) {
      return res.status(200).json({
        errorCode: 1,
        message: String(error),
      });
    }
  }
};

const swapCard = async (req, res) => {
  const colStart = req.body.colStart;
  const colEnd = req.body.colEnd;
  const cardStart = req.body.cardStart;
  const cardEnd = req.body.cardEnd;

  if (colStart.id === colEnd.id) {
    const resUpdateCol = await Column.updateOne(
      { id: colStart.id },
      { cardOrder: colStart.cardOrder }
    );
  } else {
    const resUpdateColStart = await Column.updateOne(
      { id: colStart.id },
      { cardOrder: colStart.cardOrder }
    );
    const resUpdateColEnd = await Column.updateOne(
      { id: colEnd.id },
      { cardOrder: colEnd.cardOrder }
    );

    const resUpdateCartStart = await Card.updateOne(
      { id: cardStart.id },
      { columnId: cardStart.columnId }
    );
    const resUpdateCartEnd = await Card.updateOne(
      { id: cardEnd.id },
      { columnId: cardEnd.columnId }
    );
  }

  // console.log(req.body)
  res.json({
    message: "ok",
  });
};

module.exports = { getAllCard, postNewCard, updateCard, deleteCard, swapCard };
