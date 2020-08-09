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
  const result = await query.getMembers();

  res.status(200).json({ message: "something happened" });
  return null;
});

app.get("/members", async (req, res) => {
  try {
    const result = await query.getMembers();
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "an error occured", ...error });
    return null;
  }
});

app.get("/clubs", async (req, res) => {
  try {
    const result = await query.getClubs();
    res.status(200).json({ message: "success??", data: result });
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "an error occured", ...error });
    return null;
  }
});

app.get("/applications", async (req, res) => {
  try {
    const result = await query.getApplications();
    res
      .status(200)
      .json({ message: "succesfully retrived applications", data: result });
    return null;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "an error occured", ...error });
    return null;
  }
});

app.post("/register", async (req, res) => {
  const data = req.body.data;

  if (
    data.fullname &&
    data.matricno &&
    data.age &&
    data.kulliyah &&
    data.course &&
    data.clubid &&
    data.email
  ) {
    // res.status(200).json({ message: "Success", data });

    try {
      const newData = {
        ...data,
        applicationStatus: "processing",
      };
      const result = await query.createApplication(newData);
      res.status(201).json({
        message: "successfylly added a new application",
        data: result,
      });
      return null;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "an error occured", ...error });
      return null;
    }
  } else {
    res.status(400).json({ error: "Incomplete data" });
    return null;
  }
});

app.post("/editmembers", async (req, res) => {
  const data = req.body.data;

  if (
    data.fullname &&
    data.age &&
    data.matricno &&
    data.course &&
    data.kulliyah &&
    data.status &&
    data.designation &&
    data.position &&
    data.memberid
  ) {
    try {
      const result = await query.editMembers(data);
      res
        .status(200)
        .json({ message: "succesfully update members t0", data: result });
      console.log(result);
      return null;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "an error occured", ...error });
      return null;
    }
  } else {
    res.status(400).json({ error: "an error has occured; insuffieceint data" });
    return null;
  }
});

app.post("/deletemember", async (req, res) => {
  const memberid = req.body.memberid;

  try {
    const result = await query.deleteMembers(memberid);
    res.status(201).json({ result });
    return null;
  } catch (error) {
    res.status(500).json({ error: "an error has occured", ...error });
    console.log(error);
    return null;
  }

  // res.status(200).json({ memberid });
  // return null;
});

app.listen(3001, () => {
  console.log("listening to port 3001");
});
