const express = require("express");

const router = express.Router();
const { handleGetAllRooms, handleCreateOnlineRoom } = require("../controller/room.controller");

router.get("/", handleGetAllRooms);
router.post("/online-room", handleCreateOnlineRoom);

module.exports = router;
