const express = require("express");

const router = express.Router();
const {
  handleGetAllInterview,
  handleGetAllRooms,
  handleGetCandidatesNotInterview,
  handleGetNumCandidatesByRoomWeek,
} = require("../controller/interview.controller");

router.get("/", handleGetAllInterview);
router.get("/room", handleGetAllRooms);
router.get("/not-interview", handleGetCandidatesNotInterview);
router.post("/by-room-week", handleGetNumCandidatesByRoomWeek);
router.patch("/update");

module.exports = router;
