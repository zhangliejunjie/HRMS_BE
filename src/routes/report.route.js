const express = require("express");

const router = express.Router();

const {
  handleGetAllReports,
  handleGetAllReportsByInterviewer,
  handleUpdateInterviewers,
  handleUpdateMark,
} = require("../controller/report.controller");

router.get("/", handleGetAllReports);
router.post("/by-interviewer", handleGetAllReportsByInterviewer);
router.patch("/interviewers", handleUpdateInterviewers);
router.patch("/mark", handleUpdateMark);

module.exports = router;
