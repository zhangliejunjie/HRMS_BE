import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index";
const Reports = db.Reports;
const { v4: uuidv4 } = require("uuid");

const getAllReports = async () => {
  // const query = "SELECT * FROM hrms.reports";
  const query = `SELECT R.id, AVG(R.mark) as avg_mark, R.comment, J.name as job_name, C.identity_number, C.resume_url, M.fullname, M.is_employee
FROM hrms.reports as R
INNER JOIN hrms.interviews as I
ON I.id = R.Interview_id
INNER JOIN hrms.candidatedetails as C
ON I.CandidateDetail_id = C.id
INNER JOIN hrms.members as M
ON C.Member_id = M.id
INNER JOIN hrms.jobs as J
ON J.id = C.Job_id
GROUP BY R.Interview_id`;

  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  return result;
};

const getAllReportsByInterviewer = async (interviewerId) => {
  const query = `SELECT R.id, R.mark, R.comment, R.status, I.room, I.slot, I.week, J.name as job_name, C.phone, C.resume_url, M.fullname, M.is_employee
FROM hrms.reports as R
INNER JOIN hrms.interviews as I
ON I.id = R.Interview_id
INNER JOIN hrms.candidatedetails as C
ON I.CandidateDetail_id = C.id
INNER JOIN hrms.members as M
ON C.Member_id = M.id
INNER JOIN hrms.jobs as J
ON J.id = C.Job_id
WHERE R.interviewer_id = ?`;
  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: [interviewerId],
  });
};
const getAllReportsByInterviewerByStatus = async (interviewerId) => {
  const queryPending = `SELECT R.id, R.interview_id, R.mark, R.comment, R.status, I.room, I.slot, I.week, J.name as job_name, C.phone, C.resume_url, M.fullname
FROM hrms.reports as R
INNER JOIN hrms.interviews as I
ON I.id = R.Interview_id
INNER JOIN hrms.candidatedetails as C
ON I.CandidateDetail_id = C.id
INNER JOIN hrms.members as M
ON C.Member_id = M.id
INNER JOIN hrms.jobs as J
on J.id = C.Job_id
WHERE R.interviewer_id = ? AND R.status = 'Pending'`;
  const queryDone = `SELECT R.id, R.mark, R.comment, R.status, I.room, I.slot, I.week, J.name as job_name, C.phone, C.resume_url, M.fullname
FROM hrms.reports as R
INNER JOIN hrms.interviews as I
ON I.id = R.Interview_id
INNER JOIN hrms.candidatedetails as C
ON I.CandidateDetail_id = C.id
INNER JOIN hrms.members as M
ON C.Member_id = M.id
INNER JOIN hrms.jobs as J
on J.id = C.Job_id
WHERE R.interviewer_id = ? AND R.status = 'Done'`;
  const resPending = sequelize.query(queryPending, {
    type: QueryTypes.SELECT,
    replacements: [interviewerId],
  });
  const resDone = sequelize.query(queryDone, {
    type: QueryTypes.SELECT,
    replacements: [interviewerId],
  });
  return Promise.all([resPending, resDone]);
};

const updateInterviewers = async (candidateId, interviewers) => {
  // get interviewId from candidateId
  const interviewResult = await sequelize.query(
    "SELECT id FROM hrms.interviews WHERE CandidateDetail_id = ?",
    {
      type: QueryTypes.SELECT,
      replacements: [candidateId],
    }
  );
  const interviewId = interviewResult[0].id;

  const query = `INSERT INTO hrms.reports (id, interview_id, interviewer_id, status)
  VALUES (?, ?, ?, default)`;
  const data = interviewers.map((value) => ({
    id: uuidv4(),
    interview_id: interviewId,
    interviewer_id: value,
  }));

  for (let i = 0; i < data.length; i++) {
    await sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: [data[i].id, data[i].interview_id, data[i].interviewer_id],
    });
  }
  return data;
  // return await Reports.bulkCreate(data);
};

const updateMark = async (interviewId, interviewerId, mark, comment) => {
  const query = `UPDATE hrms.reports
  SET mark = ?, comment = ?, status ='Done'
  WHERE interview_id = ? AND interviewer_id = ? `;
  const result = await sequelize.query(query, {
    type: QueryTypes.UPDATE,
    replacements: [mark, comment, interviewId, interviewerId],
  });
  console.log(result);
  return result;
};
const getReportByMemberID = async (memberID) => {
  const reportQuery = `select CandidateDetail_id as candidate_id, applied_status, room, slot, week, R.status as status, J.name as job_title from CandidateDetails inner join Interviews I on CandidateDetails.id = I.CandidateDetail_id join Reports R on I.id = R.Interview_id join Jobs J on J.id = CandidateDetails.Job_id where CandidateDetail_id = ?`;
  const result = await sequelize.query(reportQuery, {
    type: QueryTypes.SELECT,
    replacements: [memberID],
  });
  return result;
};
module.exports = {
  getAllReports,
  getAllReportsByInterviewer,
  getAllReportsByInterviewerByStatus,
  updateInterviewers,
  updateMark,
  getReportByMemberID,
};
