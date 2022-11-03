import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index.js";

const Rooms = db.Rooms;

const getAllRooms = async () => {
  return await Rooms.findAll();
};
const getRoomByInterviewID = async (interview_id) => {
  return (
    await Rooms.findOne({
      where: {
        Interview_id: interview_id,
      },
    })
  )?.dataValues;
};
const createOnlineRoom = async (
  interview_id,
  zoom_id,
  topic,
  start_url,
  join_url,
  pwd
) => {
  const query = `INSERT INTO hrms.rooms(Interview_id, zoom_id, topic, start_url, join_url, pwd, type, status)
VALUES (?, ?, ?, ?, ?, ?, 'Online', 'Active')`;
  const result = await sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [interview_id, zoom_id, topic, start_url, join_url, pwd],
  });
  console.log(result);
  return result[0];
};

module.exports = {
  getAllRooms,
  createOnlineRoom,
  getRoomByInterviewID,
};
