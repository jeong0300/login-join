const express = require("express");
const router = express.Router();
const joinController = require("../controllers/joinController");

router.post("/check", joinController.checkJoin);

router.post("/signup", joinController.signupProcess);

module.exports = router;
