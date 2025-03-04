const express = require("express");
const router = express.Router();
const joinController = require("../controllers/joinController");

router.post("/check", joinController.checkJoin);

module.exports = router;
