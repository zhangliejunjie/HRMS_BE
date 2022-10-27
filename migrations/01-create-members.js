"use strict";

const {
  userStatus,
  userStatusDefault,
} = require("../src/constant/userStatus.enum");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Members", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(320),
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      avatar: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      current_resume_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(userStatus),
        defaultValue: userStatusDefault,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING(13),
      },
      address: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      verified_code: {
        allowNull: true,
        type: Sequelize.STRING(4),
      },
      is_employee: {
        allowNull: false,
        type: Sequelize.BOOLEAN(),
        defaultValue: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Members");
  },
};
