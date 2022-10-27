const reportService = require("../service/report.service");

const handleGetAllReports = async (req, res, next) => {
  try {
    const reports = await reportService.getAllReports();
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

const handleGetAllReportsByInterviewer = async (req, res, next) => {
  try {
    const interviewerId = req.body.interviewerId;
    console.log("aaaa");
    const reports = await reportService.getAllReportsByInterviewer(
      interviewerId
    );
    res.json(reports);
  } catch (error) {
    next(error);
  }
};

const handleUpdateInterviewers = async (req, res, next) => {
  try {
    const interviewers = req.body.interviewers;
    const interviewId = req.body.interviewId;
    const result = await reportService.updateInterviewers(
      interviewId,
      interviewers
    );
    console.log(interviewers);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllReports,
  handleGetAllReportsByInterviewer,
  handleUpdateInterviewers,
};
