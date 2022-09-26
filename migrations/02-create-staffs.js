'use strict';

const { role, roleDefault } = require("../src/constant/role.enum");
const { userStatus, userStatusDefault } = require("../src/constant/userStatus.enum");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Staffs', {
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
      role: {
        allowNull: false,
        type: Sequelize.ENUM(role),
        defaultValue: roleDefault
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(userStatus),
        defaultValue: userStatusDefault

      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Staffs');
  }
};