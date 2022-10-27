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
    // console.log("aaaa");
    const reports = await reportService.getAllReportsByInterviewer(
      interviewerId
    );
    res.json({
      report_pending: reports[0],
      report_done: reports[1],
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateInterviewers = async (req, res, next) => {
  try {
    const interviewers = req.body.interviewersId;
    const interviewId = req.body.interviewId;
    const result = await reportService.updateInterviewers(
      interviewId,
      interviewers
    );
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const handleUpdateMark = async (req, res, next) => {
  try {
    const interviewerId = req.body.interviewerId;
    const mark = req.body.mark;
    const interviewId = req.body.interviewId;
    const comment = req.body.comment;
    const result = await reportService.updateMark(
      interviewId,
      interviewerId,
      mark,
      comment
    );
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllReports,
  handleGetAllReportsByInterviewer,
  handleUpdateInterviewers,
  handleUpdateMark,
};
