'use strict';

const { role, roleDefault } = require("../src/constant/role.enum.js");
const { userStatus, userStatusDefault } = require("../src/constant/userStatus.enum.js");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Staffs', {
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
      role: {
        allowNull: false,
        type: Sequelize.ENUM(role),
        defaultValue: roleDefault
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
    await queryInterface.dropTable('Staffs');
  }
};