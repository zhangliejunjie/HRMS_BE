import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index.js";
const Reports = db.Reports;
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
    const reports = await reportRepository.getAllReportsByInterviewer(
      interviewerId
    );
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

const updateMark = async (interviewId, interviewerId, mark, comment) => {
  try {
    const result = await reportRepository.updateMark(
      interviewId,
      interviewerId,
      mark,
      comment
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllReports,
  getAllReportsByInterviewer,
  updateInterviewers,
  updateMark,
};
