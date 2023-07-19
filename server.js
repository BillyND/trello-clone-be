require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;
const { connection } = require("./src/config/database");
const app = express();
const boardRoutes = require("./src/routes/boardRoutes");
const columnRoutes = require("./src/routes/columnRoutes");
const cardRoutes = require("./src/routes/cardRoutes");
const cors = require("cors");

app.use(cors());

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//config req.body
app.use(express.json()); //for json
app.use(express.urlencoded({ extended: true })); //for form data

//routes
app.use("/v1/api", boardRoutes);
app.use("/v1/api", columnRoutes);
app.use("/v1/api", cardRoutes);

app.get("/", (req, res) => {
  res.send("Api trello running ");
});

// testConnection
let testConnect = async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Example app listening on http://${hostname}:${port}`);
    });
  } catch (error) {
    console.log(">>>>error", error);
  }
};
testConnect();
