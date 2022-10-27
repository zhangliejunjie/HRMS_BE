const express = require("express");

const router = express.Router();

const {
  handleGetAllReports,
  handleGetAllReportsByInterviewer,
} = require("../controller/report.controller");

router.get("/", handleGetAllReports);
router.post("/by-interviewer", handleGetAllReportsByInterviewer);

module.exports = router;
