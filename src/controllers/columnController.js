const Board = require("../models/Board");
const Column = require("../models/Column");
const { pushColumnOrder } = require("./boardController");

const getAllColumn = async (req, res) => {
  const boardId = req.body.boardId;
  if (!boardId || !boardId.trim()) {
    res.status(200).json({
      errorCode: 1,
      message: "Payload is empty!",
    });
  } else {
    try {
      let resAllColumn = await Board.aggregate([
        {
          $match: {
            id: boardId,
          },
        },
        {
          $lookup: {
            from: "columns",
            localField: "id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: "cards",
            localField: "id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ]);

      let dataBoard = resAllColumn.find((board) => board.id === boardId);
      dataBoard.columns.map((column) => {
        column.cards = dataBoard.cards.filter(
          (card) => card.columnId === column.id
        );
      });

      //remove cards data from boards
      delete dataBoard.cards;

      return res.status(200).json({
        errorCode: 0,
        message: "Get all column success!",
        data: dataBoard,
      });
    } catch (error) {
      return res.status(200).json({
        errorCode: 1,
        message: String(error),
      });
    }
  }
};

const pushCardOrder = async (columnId, cardId) => {
  try {
    const resPushCardOrder = Column.findOneAndUpdate(
      { id: columnId },
      { $push: { cardOrder: cardId } }
    );

    return resPushCardOrder;
  } catch (error) {
    throw new Error(error);
  }
};

const postNewColumn = async (req, res) => {
  const newColumnId = req.body.id;
  const title = req.body.title;
  const boardId = req.body.boardId;
  const cardOrder = req.body.cardOrder || [];
  const cards = req.body.cards || [];

  const options = {
    id: newColumnId,
    title: title,
    boardId: boardId,
    cardOrder: cardOrder,
    cards: cards,
  };

  if (!newColumnId.trim() || !title.trim() || !boardId.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resPostColumn = await Column.create(options);
      const updateBoard = await pushColumnOrder(boardId, newColumnId);
      return res.status(200).json({
        errorCode: 0,
        message: "Create Column success!",
        data: options,
      });
    } catch (error) {
      return res.status(201).json({
        errorCode: 1,
        message: String(error),
      });
    }
  }
};

const updateColumn = async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const boardId = req.body.boardId;
  const cardOrder = req.body.cardOrder;
  const cards = req.body.cards;
  const options = {
    id: id,
    title: title,
    boardId: boardId,
    cardOrder: cardOrder,
    cards: cards,
  };

  if (!id.trim() || !title.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resPutColumn = await Column.updateOne({ id: id }, options);
      return res.status(200).json({
        errorCode: 0,
        message: "Update column success!",
        data: resPutColumn,
      });
    } catch (error) {
      return res.status(200).json({
        errorCode: 1,
        message: String(error),
      });
    }
  }
};

const deleteColumn = async (req, res) => {
  const id = req.body.id;
  const boardId = req.body.boardId;
  const columnOrder = req.body.columnOrder;

  if (!id.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resFindOne = await Column.findOne({ id: id });
      const resDelete = await Column.deleteOne({ id: id });
      const resUpdateOrder = await Board.updateOne(
        { id: boardId },
        { columnOrder: columnOrder }
      );

      return res.status(200).json({
        errorCode: 0,
        message: "Delete Column success!",
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

module.exports = {
  getAllColumn,
  pushCardOrder,
  postNewColumn,
  updateColumn,
  deleteColumn,
};
