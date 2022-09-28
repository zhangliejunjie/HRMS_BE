const express = require("express");
const auth = require("../middleware/auth.middleware");
const memberController = require("../controller/member.controller");
const router = express.Router();

router.route("/profile").get(auth, memberController.profile);

module.exports = router;
