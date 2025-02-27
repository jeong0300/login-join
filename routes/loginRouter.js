const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", loginController.moveLogin);

router.post("/check", loginController.checkLogin);

module.exports = router;
