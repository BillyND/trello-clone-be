require("dotenv").config();
const mongoose = require("mongoose");

var dbState = [
  {
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
];

const connection = async () => {
  const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  };
  try {
    await mongoose.connect(process.env.DB_HOST2, options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value == state).label, "to db");
    // connected to db
  } catch (error) {
    console.log(">>>error connection", error);
  }
};

module.exports = { connection };
