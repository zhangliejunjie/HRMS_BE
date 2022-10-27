import { ApiError } from "../middleware/apiError";
import { showAllStaff } from "../repository/staffs.repository";
import {
  createNewCandidateDetails,
  // getCandidateDetailsByMemberID,
  getSpecificCandidateById,
  updateCandidateProfile,
} from "../repository/candidates.repository";
import httpStatus from "http-status";
import db, { sequelize } from "../models/index";
import { mailSending } from "../utils/mailSending";
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
    // console.log(candidateDetail);
    return candidateDetail;
  } catch (error) {
    // console.log(error);
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
    // console.log(results);

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
    const candidate = await getSpecificCandidateById(req.body.id);
    console.log(candidate);

    const cvResult =
      req.body.status === "Approve"
        ? "\nCongratulations on passing the resume round, HR will contact you as soon as possible to continue for the interview round."
        : "\nWe're sorry to inform you that your resume has been rejected, hope to see you next time";
    mailSending(
      candidate.member_email,
      `Resume result about ${candidate.job_name}`,
      `
        ${cvResult}
        Best, FCode eCruitment
      `
    ).then((res) => console.log(`send mail successfully`));
    return results;
  } catch (error) {
    throw error;
  }
};

const getAllCandidateDetailWithStaffIDMemberIDJobID = async () => {
  const query = `SELECT 
    CD.id, CD.identity_number, CD.resume_url, CD.phone, CD.applied_status, CD.dob, CD.address, J.name as job, S.fullname as hr_staff, M.fullname as member,
    case 
      when CD.id in (select i.candidatedetail_id from hrms.interviews as i) then 'YES' 
      else 'NO' 
    end as booking_status 
  FROM hrms.candidatedetails CD 
  INNER JOIN hrms.jobs J 
  ON CD.Job_id = J.id 
  INNER JOIN hrms.members M 
  ON CD.Member_id = M.id 
  INNER JOIN hrms.staffs S 
  ON CD.HRStaff_id = S.id 
  WHERE S.role = 'HR Staff'
      AND CD.applied_status = 'Approve'`;
  try {
    let candidateList = [];
    const [results] = await sequelize.query(query);
    candidateList = results;
    return candidateList;
  } catch (error) {
    throw error;
  }
};

const updateCandidateProfileStatus = async (candidateId, appliedResult) => {
  try {
    const result = await updateCandidateProfile(candidateId, appliedResult);
    return result;
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
  getAllCandidateDetailWithStaffIDMemberIDJobID,
  updateCandidateProfileStatus,
};
