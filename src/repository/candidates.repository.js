const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");
// db column name = CandidateDetails
const findOne = async (where) => {
  return (await db.CandidateDetails.findOne({ where: where }))?.dataValues;
};
const createNewCandidateDetails = async (obj) => {
  // const testObj = {
  //   id: "b32c8efc-381c-4ff8-b82e-ea3b38a50298",
  //   ...obj,
  // };
  // console.log(obj)
  const candidate = await db.CandidateDetails.create({
    ...obj,
  });
  return candidate?.dataValues;
};

const getCandidateDetailsByMemberID = async (memberID) => {
  console.log({ ...db.CandidateDetails });
  return (
    await db.CandidateDetails.findAll({
      where: {
        Member_id: memberID,
      },
    })
  )?.dataValues;
};
const getCandidateDetailsByStaffID = async (staffID) => {
  return (
    await db.CandidateDetails.findOne({
      where: {
        HRStaff_id: staffID,
      },
    })
  )?.dataValues;
};
const getCandidateDetailsById = async (candidateDetailsID) => {
  return (
    await db.CandidateDetails.findOne({
      where: {
        id: candidateDetailsID,
      },
    })
  )?.dataValues;
};
const update = async (newObj, where) => {
  await db.CandidateDetails.update(newObj, {
    where: where,
  });
};
const showAllCandidateDetails = async () => {
  let candidateDetailList = [];
  candidateDetailList = await db.CandidateDetails.findAll({ raw: true });
  return candidateDetailList;
};
const getSpecificCandidateById = async (candidateID) => {
  const [result] = await sequelize.query(
    `select 
        C.id, C.identity_number, C.resume_url, C.phone, C.applied_status, C.dob, C.address, C.Job_id, C.HRStaff_id, C.Member_id, M.email as member_email, M.fullname as member_fullname, J.name as job_name
    from CandidateDetails AS C
    inner join Members M 
    on C.Member_id = M.id 
    inner join Jobs J 
    on J.id = C.Job_id 
    where C.id = ?`,
    {
      replacements: [`${candidateID}`],
    }
  );
  return result[0];
};

const updateCandidateProfile = async (candidateID, appliedResult) => {
  console.log("aaaa");
  const query = `UPDATE hrms.candidatedetails as C
INNER JOIN hrms.members as M
ON C.Member_id = M.id
SET M.is_employee = true
WHERE C.id = ?`;
  if (appliedResult === "reject") return null;
  const result = await sequelize.query(query, {
    type: QueryTypes.UPDATE,
    replacements: [candidateID],
  });
  return result;
};

module.exports = {
  findOne,
  createNewCandidateDetails,
  getCandidateDetailsByMemberID,
  getCandidateDetailsByStaffID,
  getCandidateDetailsById,
  update,
  showAllCandidateDetails,
  getSpecificCandidateById,
  updateCandidateProfile,
};
