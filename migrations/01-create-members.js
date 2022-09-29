'use strict';

const { userStatus, userStatusDefault } = require("../src/constant/userStatus.enum.js");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(320)
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(60)
      },
      current_resume_url: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(userStatus),
        defaultValue: userStatusDefault
      },
      avatar_url: {

        type: Sequelize.TEXT,

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Members');
  }
};