"use strict";

const {
  jobStatus,
  jobStatusDefault,
  jobExperienced,
  jobExperiencedDefault,
} = require("../src/constant/jobStatus.enum.js");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      salary: {
        allowNull: true,
        type: Sequelize.STRING(45),
      },
      quantity: {
        defaultValue: 0,
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
        },
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(jobStatus),
        defaultValue: jobStatusDefault,
      },
      experience: {
        allowNull: false,
        type: Sequelize.ENUM(jobExperienced),
        defaultValue: jobExperiencedDefault,
      },
      isRemote: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      Category_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      Campaign_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: "Campaigns",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Jobs");
  },
};
