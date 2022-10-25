const express = require("express");

const router = express.Router();
const {
  handleGetAllInterview,
  handleGetAllRooms,
  handleGetCandidatesNotInterview,
} = require("../controller/interview.controller");

router.get("/", handleGetAllInterview);
router.get("/room", handleGetAllRooms);
router.get("/not-interview", handleGetCandidatesNotInterview);

module.exports = router;
