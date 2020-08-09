const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

// const query = require("./database/query");

const query = require("./database/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "hello" });
  return null;
});

app.get("/testing", async (req, res) => {
  await query();

  res.status(200).json({ message: "something happened" });
  return null;
});

app.listen(3001, () => {
  console.log("listening to port 3001");
});
