const express = require("express");

const router = express.Router();

const {
  handleGetAllReports,
  handleGetAllReportsByInterviewer,
  handleUpdateInterviewers,
  handleUpdateMark,
  getReportByMemberID,
} = require("../controller/report.controller");

router.get("/", handleGetAllReports);
router.post("/by-interviewer", handleGetAllReportsByInterviewer);
router.patch("/interviewers", handleUpdateInterviewers);
router.patch("/mark", handleUpdateMark);
router.post("/member", getReportByMemberID);
module.exports = router;
