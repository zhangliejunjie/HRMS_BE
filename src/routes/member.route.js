const express = require("express");
const auth = require("../middleware/auth.middleware");
const memberController = require("../controller/member.controller");
const router = express.Router();
const db = require("../models");
router
  .route("/profile")
  .get(auth, memberController.profile)
  .patch(auth, memberController.updateProfile);

module.exports = router;
