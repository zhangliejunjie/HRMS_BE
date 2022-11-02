const httpStatus = require("http-status");
const reportService = require("../service/report.service");
import { ApiError } from "../middleware/apiError";
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
    const candidateId = req.body.candidateId;
    const result = await reportService.updateInterviewers(
      candidateId,
      interviewers
    );
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
const getReportByMemberID = async (req, res, next) => {
  try {
    console.log(req.body.member_id);
    const reportByMember = await reportService.getReportByMember(
      req.body.member_id
    );
    res.send(reportByMember);
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
    if (Number(mark) > 10 || Number(mark) < 0 || mark == null) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Mark can be from 0 to 10");
    }
    if (comment.length === 0 || comment == null) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Comment must be provide");
    }
    const result = await reportService.updateMark(
      interviewId,
      interviewerId,
      mark,
      comment
    );
    return res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleGetAllReports,
  handleGetAllReportsByInterviewer,
  handleUpdateInterviewers,
  handleUpdateMark,
  getReportByMemberID,
};
