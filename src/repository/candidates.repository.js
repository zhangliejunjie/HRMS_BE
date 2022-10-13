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
module.exports = {
  findOne,
  createNewCandidateDetails,
  getCandidateDetailsByMemberID,
  getCandidateDetailsByStaffID,
  getCandidateDetailsById,
  update,
  showAllCandidateDetails,
};
