const Board = require("../models/Board");

const getAllBoard = async (req, res) => {
  console.log(">>>ok");
  try {
    const resAllBoard = await Board.find({});
    return res.status(200).json({
      errorCode: 0,
      message: "Get all board success!",
      data: resAllBoard,
    });
  } catch (error) {
    return res.status(200).json({
      errorCode: 1,
      message: String(error),
    });
  }
};

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const resPushColOrder = Board.findOneAndUpdate(
      { id: boardId },
      { $push: { columnOrder: columnId } }
    );

    return resPushColOrder;
  } catch (error) {
    throw new Error(error);
  }
};

const updateColumnOrder = async (boardId, columnId) => {
  try {
    const resPushColOrder = Board.findOneAndUpdate(
      { id: boardId },
      { $push: { columnOrder: columnId } }
    );

    return resPushColOrder;
  } catch (error) {
    throw new Error(error);
  }
};

const postNewBoard = async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const columnOrder = req.body.columnOrder || [];
  const columns = req.body.columns || [];

  const options = {
    id: id,
    title: title,
    columnOrder: columnOrder,
    columns: columns,
  };

  if (!id.trim() || !title.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resPostBoard = await Board.create(options);
      return res.status(200).json({
        errorCode: 0,
        message: "Create board success2!",
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

const updateBoard = async (req, res) => {
  const id = req.body.id;
  const title = req.body.title || "";
  const columnOrder = req.body.columnOrder;
  const columns = req.body.columns || [];
  const options = {
    id: id,
    title: title,
    columnOrder: columnOrder,
    columns: columns,
  };
  if (!id.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resPutBoard = await Board.updateOne({ id: id }, options);
      return res.status(200).json({
        errorCode: 0,
        message: "Update board success!",
        data: resPutBoard,
      });
    } catch (error) {
      return res.status(200).json({
        errorCode: 1,
        message: String(error),
      });
    }
  }
};

const deleteBoard = async (req, res) => {
  const id = req.body.id;

  if (!id.trim()) {
    return res.status(200).json({
      errorCode: 1,
      message: "Data empty!",
    });
  } else {
    try {
      const resFindOne = await Board.findOne({ id: id });
      const resDelete = await Board.deleteOne({ id: id });

      return res.status(200).json({
        errorCode: 0,
        message: "Delete Board success!",
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
  getAllBoard,
  postNewBoard,
  updateBoard,
  deleteBoard,
  pushColumnOrder,
};
