import { ApiError } from "../middleware/apiError";
import { showAllStaff } from "../repository/staffs.repository";
import {
  createNewCandidateDetails,
  getCandidateDetailsByMemberID,
} from "../repository/candidates.repository";
import httpStatus from "http-status";
import db, { sequelize } from "../models/index";
const createNewCandidate = async (req, res) => {
  try {
    const staffList = await showAllStaff();
    const getRandomStaff =
      staffList[Math.floor(Math.random() * staffList.length)];
    if (!getRandomStaff) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Dont have any Staff to approve"
      );
    }
    const { member, job_id, ...rest } = req.body;

    const candidateList = await getListCandidate();
    if (candidateList.length > 0) {
      candidateList.forEach((candidate) => {
        if (candidate.Job_id === job_id && candidate.Member_id === member.id) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "this Member already apply this job"
          );
        }
      });
    }
    const candidateDetailData = {
      resume_url: member.current_resume_url,
      phone: member.phone,
      Job_id: job_id,
      HRStaff_id: getRandomStaff.id,
      Member_id: member.id,
      ...rest,
    };
    const candidateDetail = await createNewCandidateDetails(
      candidateDetailData
    );
    if (!candidateDetail) {
      throw new ApiError(httpStatus.BAD_REQUEST, "ERROR cant create candidate");
    }
    return candidateDetail;
  } catch (error) {
    throw error;
  }
};
const getListCandidate = async (req, res) => {
  try {
    let candidateList = [];
    const [results] = await sequelize.query("select * from CandidateDetails");
    candidateList = results;
    return candidateList;
  } catch (error) {
    throw error;
  }
};
const getListCandidateByMemberID = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      `select id, resume_url, phone, applied_status, Member_id from CandidateDetails where Member_id = ?`,
      {
        replacements: [req.id],
      }
    );
    // const candidateByMember = await getCandidateDetailsByMemberID(memberID);
    console.log(results);
    return results;
    // if (results.length > 0) {}
    // return candidateByMember;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createNewCandidate,
  getListCandidate,
  getListCandidateByMemberID,
};
