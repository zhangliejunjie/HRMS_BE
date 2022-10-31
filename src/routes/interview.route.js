const express = require("express");

const router = express.Router();
const {
  handleGetAllInterview,
  handleGetAllRooms,
  handleGetCandidatesNotInterview,
  handleGetNumCandidatesByRoomWeek,
  handleGetAllCandidates,
  handleCreateNewInterview,
  handleGetListCandidatesBySlot,
} = require("../controller/interview.controller");

router.get("/", handleGetAllInterview);
router.get("/room", handleGetAllRooms);
router.get("/not-interview", handleGetCandidatesNotInterview);
router.post("/by-room-week", handleGetNumCandidatesByRoomWeek);
// router.patch("/update");
router.get("/all-candidates", handleGetAllCandidates);
router.post("/", handleCreateNewInterview);
router.post("/candidates-by-slot", handleGetListCandidatesBySlot);

module.exports = router;
