"use strict";

const {
  roomType,
  roomStatus,
  roomStatusDefault,
  roomTypeDefault,
} = require("../src/constant/room.enum");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Rooms", {
      Interview_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: "Interviews",
          key: "id",
        },
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      zoom_id: {
        allowNull: true,
        type: Sequelize.STRING(20),
      },
      topic: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      join_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      start_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      pwd: {
        allowNull: true,
        type: Sequelize.STRING(20),
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(roomType),
        default: roomTypeDefault,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(roomStatus),
        default: roomStatusDefault,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Rooms");
  },
};
