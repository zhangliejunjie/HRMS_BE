const db = require("../models");
import { QueryTypes } from "sequelize";
import { sequelize } from "../models/index.js";

const Interviews = db.Interviews;

const updateInterviews = async (newObj, where) => {
  return await Interviews.update(newObj, {
    where: where,
  });
};

const getInterviews = async (where) => {
  return await Interviews.findAll({
    where: where,
    raw: true,
  });
};

const getAllRooms = async () => {
  return await sequelize.query("SELECT DISTINCT room FROM hrms.interviews", {
    type: QueryTypes.SELECT,
  });
};

const getCandidatesNotInterview = async () => {
  const query =
    'SELECT * FROM hrms.candidatedetails where id not in (select candidateDetail_id from hrms.interviews) and applied_status = "Approve"';
  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
};

const getNumCandidatesByRoomWeek = async (week) => {
  const query =
    "SELECT i.slot,  count(*) as num_candidate FROM hrms.interviews as i where i.room = 1 and week(i.date) = ? group by i.slot";
  return await sequelize.query(query, {
    replacements: [week],
    type: QueryTypes.SELECT,
  });
};

module.exports = {
  getInterviews,
  getAllRooms,
  getCandidatesNotInterview,
  getNumCandidatesByRoomWeek,
  updateInterviews,
};
