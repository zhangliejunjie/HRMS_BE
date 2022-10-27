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

module.exports = {
  getAllReports,
  getAllReportsByInterviewer,
};
