import { ApiError } from "../middleware/apiError";
import { sendMail } from "../repository/members.repository";
import { showAllStaff } from "../repository/staffs.repository";
import {
  createNewCandidateDetails,
  getCandidateDetailsByMemberID,
} from "../repository/candidates.repository";
import httpStatus from "http-status";
import db, { sequelize } from "../models/index";

require("dotenv").config();

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
    let myResumeURL = req.body.my_resume_url;
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
    if (!myResumeURL) {
      myResumeURL = member.current_resume_url;
    }
    const candidateDetailData = {
      resume_url: myResumeURL,
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
    console.log(candidateDetail);
    return candidateDetail;
  } catch (error) {
    console.log(error);
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
      `select c.id, c.resume_url, c.phone, c.applied_status, j.name as job_name from CandidateDetails c inner join Jobs J on c.Job_id = J.id where c.Member_id = ?`,
      {
        replacements: [`${req.body.id}`],
      }
    );
    // const candidateByMember = await getCandidateDetailsByMemberID(memberID);
    console.log(results);

    if (results.length === 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This member dont have any request job"
      );
    }
    return results;
    // return candidateByMember;
  } catch (error) {
    throw error;
  }
};
const getAllCandidateByStaffID = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      `select c.id, c.resume_url, c.phone, c.applied_status, j.name as job_name, M.fullname as member_name, M.avatar as member_avatar, M.id as member_id from CandidateDetails c inner join Jobs J on c.Job_id = J.id inner join Staffs S on c.HRStaff_id = S.id inner join Members M on c.Member_id = M.id where S.id = ?`,
      {
        replacements: [`${req.body.id}`],
      }
    );
    if (results.length === 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This staff dont have any request job"
      );
    }
    return results;
  } catch (error) {
    throw error;
  }
};
//
const candidateStatusChange = async (req, res) => {
  try {
    const [res] = await sequelize.query(
      `select * from CandidateDetails where Member_id = ? and applied_status = 'Approve'`,
      {
        replacements: [`${req.body.member_id}`],
      }
    );
    if (res.length > 0 && req.body.status === "Approve") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This Member has already been approved for another job"
      );
    }
    const [results] = await sequelize.query(
      `update CandidateDetails set applied_status = ? where id = ?`,
      {
        replacements: [`${req.body.status}`, `${req.body.id}`],
      }
    );

    if (results.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Error with applied status");
    }
    // sendMail
    return results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createNewCandidate,
  getListCandidate,
  getListCandidateByMemberID,
  candidateStatusChange,
  getAllCandidateByStaffID,
};
