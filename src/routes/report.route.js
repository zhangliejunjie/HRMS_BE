const express = require("express");

const router = express.Router();

const {
  handleGetAllReports,
  handleGetAllReportsByInterviewer,
  handleUpdateInterviewers,
} = require("../controller/report.controller");

router.get("/", handleGetAllReports);
router.post("/by-interviewer", handleGetAllReportsByInterviewer);
router.patch("/interviewers", handleUpdateInterviewers);

module.exports = router;
