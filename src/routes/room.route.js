const express = require("express");

const router = express.Router();
const { handleGetAllRooms } = require("../controller/room.controller");

router.get("/", handleGetAllRooms);

module.exports = router;
