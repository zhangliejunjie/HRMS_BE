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
  console.log("aaaa");
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
  const query = `SELECT * 
    FROM hrms.candidatedetails 
    WHERE 
      id NOT IN 
        (SELECT candidateDetail_id FROM hrms.interviews) 
      AND applied_status = "Approve"`;
  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
};

const getNumCandidatesByRoomWeek = async (week) => {
  const query = `SELECT i.date, i.slot, count(*) as num_candidates 
    FROM hrms.interviews as i 
    WHERE i.room = ? AND WEEK(i.date) = ? 
    GROUP BY i.date, i.slot`;

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
    // generate slotPositon from date and slot
    const slotPositions = data.map(
      (row) => (new Date(row.date).getDay() - 1) * 4 + row.slot
    );

    for (let i = 0; i < slotPositions.length; i++) {
      if (slotPositions[i] === slot) {
        return data[i].num_candidates;
      }
    }
    return 0;
  }

  return result;
};

const getAllCandidates = async () => {
  const query = `SELECT 
          c.id, c.resume_url, c.phone, c.address, 
          case 
            when c.id in (select i.candidatedetail_id from hrms.interviews as i) then 'YES' 
            else 'NO' 
          end as booking_status 
    FROM hrms.candidatedetails as c 
    WHERE applied_status = 'Approve'`;
  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
};

const createNewInterview = async (data) => {
  const res = await Interviews.create({
    CandidateDetail_id: data.candidateId,
    type: data.type,
    room: data.room,
    slot: data.slot,
    date: data.date,
  });
  return res.dataValues;
};

const getListCandidatesBySlot = async (data) => {
  const onlineQuery = `SELECT M.fullname, J.name, M.email, M.address, M.phone, RO.start_url
FROM hrms.interviews as I
INNER JOIN hrms.candidatedetails as C
ON I.candidatedetail_id = C.id
INNER JOIN hrms.members as M
ON C.member_id = M.id
INNER JOIN hrms.jobs as J
ON C.Job_id = J.id
INNER JOIN hrms.rooms AS RO
ON I.id = RO.interview_id
WHERE I.date = ? AND I.room = ? AND I.slot = ?`;

  const offlineQuery = `SELECT M.fullname, J.name, M.email, M.address, M.phone
FROM hrms.interviews as I
INNER JOIN hrms.candidatedetails as C
ON I.candidatedetail_id = C.id
INNER JOIN hrms.members as M
ON C.member_id = M.id
INNER JOIN hrms.jobs as J
ON C.Job_id = J.id
WHERE I.date = ? AND I.room = ? AND I.slot = ?`;

  console.log(data);
  return await sequelize.query(data.room == 9 ? onlineQuery : offlineQuery, {
    type: QueryTypes.SELECT,
    replacements: [data.date, data.room, data.slot],
  });
};

const getInterviewByCandidateId = async (candidateId) => {
  const query = `SELECT * 
  FROM hrms.interviews as I 
  WHERE I.candidatedetail_id = ?`;
  const data = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: [candidateId],
  });
  return data;
};

const updateInterviewByID = async (candidateId, date, room, slot) => {
  const query = `update hrms.interviews 
  set date = ?, room = ?, slot = ? 
  where candidatedetail_id = ?`;
  const data = await sequelize.query(query, {
    type: QueryTypes.UPDATE,
    replacements: [date, room, slot, candidateId],
  });
  return data;
};

module.exports = {
  getInterviews,
  getAllRooms,
  getCandidatesNotInterview,
  getNumCandidatesByRoomWeek,
  updateInterviews,
  getAllCandidates,
  createNewInterview,
  getListCandidatesBySlot,
  getInterviewByCandidateId,
  updateInterviewByID,
};
