"use strict";

const {
  interviewStatus,
  interviewStatusDefault,
} = require("../src/constant/interviewStatus.enum.js");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Interviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      room: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      // start_time: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // end_time: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      slot: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      week: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(interviewStatus),
        defaultValue: interviewStatusDefault,
      },
      CandidateDetail_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: "CandidateDetails",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Interviews");
  },
};
