const express = require("express");
const authController = require("../controller/auth.controller.js");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.patch("/verify", authController.verifyCode);
router.get("/isauth", auth, authController.isauth);
//------reset password------
router.post("/forgot-password", authController.forgotPassword);
router.get("/reset-password/:id/:token", authController.resetPassword);
router.post("/reset-password/:id/:token", authController.setNewPassword);

module.exports = router;
