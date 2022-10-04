const express = require("express");
const authController = require("../controller/auth.controller.js");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/isauth", auth, authController.isauth);

module.exports = router;
