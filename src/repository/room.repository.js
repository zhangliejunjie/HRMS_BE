import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index.js";

const Rooms = db.Rooms;

const getAllRooms = async () => {
  return await Rooms.findAll();
};

const createOnlineRoom = async (zoom_id, topic, start_url, join_url, pwd) => {
  const query = `INSERT INTO hrms.rooms(zoom_id, topic, start_url, join_url, pwd, type, status)
VALUES (?, ?, ?, ?, ?, 'Online', 'Active')`;
  const result = await sequelize.query(query, {
    type: QueryTypes.INSERT,
    replacements: [zoom_id, topic, start_url, join_url, pwd],
  });
  console.log(result);
  return result[0];
};

module.exports = {
  getAllRooms,
  createOnlineRoom,
};
