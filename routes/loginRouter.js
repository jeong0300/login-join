const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", loginController.moveLogin);

router.get("/main_jwt", loginController.moveMain);

router.post("/check", loginController.checkLogin);

router.post("/verify", loginController.verify);

module.exports = router;
