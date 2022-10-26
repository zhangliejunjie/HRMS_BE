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
    `select CandidateDetails.id, CandidateDetails.identity_number, CandidateDetails.resume_url, CandidateDetails.phone, CandidateDetails.applied_status, CandidateDetails.dob, CandidateDetails.address, CandidateDetails.Job_id, CandidateDetails.HRStaff_id, CandidateDetails.Member_id, M.email as member_email, M.fullname as member_fullname, J.name as job_name from CandidateDetails inner join Members M on CandidateDetails.Member_id = M.id inner join Jobs J on J.id = CandidateDetails.Job_id where CandidateDetails.id = ?`,
    {
      replacements: [`${candidateID}`],
    }
  );
  return result[0];
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
};
