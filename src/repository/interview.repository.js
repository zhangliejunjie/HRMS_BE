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

const getNumCandidatesByRoomWeek = async (week) => {
  const query =
    "SELECT i.slot,  count(*) as num_candidates FROM hrms.interviews as i WHERE i.room = ? AND i.week = ? GROUP BY i.slot";

  // gererate result
  const result = [];

  for (let room = 1; room <= 9; room++) {
    const data = await sequelize.query(query, {
      replacements: [room, week],
      type: QueryTypes.SELECT,
    });
    // create 24 slots
    const roomArr = Array(24).fill(0);
    // use slot + 1 because slot in interview table started from 1 to 24
    const newArr = roomArr.map((value, slot) => updateRoom(data, slot + 1));

    const resultData = {
      name: `room ${room}`,
      data: newArr,
    };
    result.push(resultData);
  }

  function updateRoom(data, slot) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].slot === slot) {
        return data[i].num_candidates;
      }
    }
    return 0;
  }

  return result;
};

module.exports = {
  getInterviews,
  getAllRooms,
  getCandidatesNotInterview,
  getNumCandidatesByRoomWeek,
};
