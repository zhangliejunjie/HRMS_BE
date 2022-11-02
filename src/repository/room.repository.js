const db = require("../models");
import { QueryTypes } from "sequelize";
import { Sequelize } from "../models/index.js";

const Rooms = db.Rooms;

const getAllRooms = async () => {
  return await Rooms.findAll();
};

module.exports = {
  getAllRooms,
};
