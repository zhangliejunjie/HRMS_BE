import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index";
const Reports = db.Reports;

const getAllReports = async () => {
  const query = "SELECT * FROM hrms.reports";
  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return result;
};

const getAllReportsByInterviewer = async (interviewerId) => {
  const query = `SELECT R.id, R.mark, R.comment, R.status, I.room, I.slot, I.week, J.name as job_name, C.phone, C.resume_url, M.fullname
FROM hrms.reports as R
INNER JOIN hrms.interviews as I
ON I.id = R.Interview_id
INNER JOIN hrms.candidatedetails as C
ON I.CandidateDetail_id = C.id
INNER JOIN hrms.members as M
ON C.Member_id = M.id
INNER JOIN hrms.jobs as J
on J.id = C.Job_id
WHERE R.interviewer_id = ?`;
  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: [interviewerId],
  });
};

module.exports = {
  getAllReports,
  getAllReportsByInterviewer,
};
