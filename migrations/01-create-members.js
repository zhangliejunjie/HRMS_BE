'use strict';

const { userStatus, userStatusDefault } = require("../src/constant/userStatus.enum");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(6)
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
        type: Sequelize.STRING(45)
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Members');
  }
};