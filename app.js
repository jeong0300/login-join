const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

const loginRouter = require("./routes/loginRouter");
const joinRouter = require("./routes/joinRouter");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "static")));

app.use("/login", loginRouter);
app.use("/join", joinRouter);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

let data = "";

app.get("/userinfo", (req, res) => {
  res.json(data);
});

app.get("/", (req, res) => {
  res.render("first");
});

app.get("/join", (req, res) => {
  res.render("join");
});

app.get("/join_jwt", (req, res) => {
  res.render("join_jwt");
});

app.get("/findId", (req, res) => {
  res.render("findId");
});

app.get("/findPw", (req, res) => {
  res.render("findPw");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
