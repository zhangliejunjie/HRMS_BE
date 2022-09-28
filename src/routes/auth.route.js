const express = require("express");
const authController = require("../controller/auth.controller.js");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/isauth", authController.isauth);

module.exports = router;
