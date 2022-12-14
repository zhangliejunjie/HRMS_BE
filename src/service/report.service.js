import httpStatus from "http-status";
import { ApiError } from "../middleware/apiError";
import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index.js";
const reportRepository = require("../repository/reports.repository");

const getAllReports = async () => {
  try {
    const reports = await reportRepository.getAllReports();
    console.log(reports);
    return reports;
  } catch (error) {
    throw error;
  }
};

const getAllReportsByInterviewer = async (interviewerId) => {
  try {
    const reports = await reportRepository.getAllReportsByInterviewerByStatus(
      interviewerId
    );
    console.log(reports);
    return reports;
  } catch (error) {
    throw error;
  }
};

const updateInterviewers = async (interviewId, interviewers) => {
  try {
    const result = await reportRepository.updateInterviewers(
      interviewId,
      interviewers
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const updateMark = async (candidateId, interviewerId, mark, comment) => {
  try {
    const result = await reportRepository.updateMark(
      candidateId,
      interviewerId,
      mark,
      comment
    );
    if (result[1] == 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Error, Cant update");
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const getReportByMember = async (memberID) => {
  try {
    const report = await reportRepository.getReportByMemberID(memberID);
    return report;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllReports,
  getAllReportsByInterviewer,
  updateInterviewers,
  updateMark,
  getReportByMember,
};
