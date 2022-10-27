const express = require("express");

const router = express.Router();
const {
  handleGetAllInterview,
  handleGetAllRooms,
  handleGetCandidatesNotInterview,
  handleGetNumCandidatesByRoomWeek,
  handleGetAllCandidates,
  handleCreateNewInterview,
} = require("../controller/interview.controller");

router.get("/", handleGetAllInterview);
router.get("/room", handleGetAllRooms);
router.get("/not-interview", handleGetCandidatesNotInterview);
router.post("/by-room-week", handleGetNumCandidatesByRoomWeek);
router.get("/all-candidates", handleGetAllCandidates);
router.post("/", handleCreateNewInterview);

module.exports = router;
