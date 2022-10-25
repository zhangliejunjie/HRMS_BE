const db = require("../models");
import { QueryTypes } from "sequelize";
import { sequelize } from "../models/index.js";

const Interviews = db.Interviews;

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

module.exports = { getInterviews, getAllRooms, getCandidatesNotInterview };
