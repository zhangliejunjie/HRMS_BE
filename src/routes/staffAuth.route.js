const express = require("express");
const staffAuthController = require("../controller/staffAuth.controller.js");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", staffAuthController.register);
router.post("/login", staffAuthController.login);
router.get("/isauth", auth, staffAuthController.isauth);

module.exports = router;
