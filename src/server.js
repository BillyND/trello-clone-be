require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;
const { connection } = require("./config/database");
const app = express();
const boardRoutes = require("./routes/boadRoutes");
const columnRoutes = require("./routes/columnRoutes");
const cardRoutes = require("./routes/cardRoutes");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
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

// testconnection
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
