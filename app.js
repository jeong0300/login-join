const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

let data = "";

app.get("/userinfo", (req, res) => {
  res.json(data);
});

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/join", (req, res) => {
  res.render("join");
});

app.get("/findId", (req, res) => {
  res.render("findId");
});

app.get("/findPw", (req, res) => {
  res.render("findPw");
});

app.get("/main", (req, res) => {
  data = req.query;
  res.render("main", { data: data });
});

app.post("/", (req, res) => {
  data = req.body;
  res.render("login");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
