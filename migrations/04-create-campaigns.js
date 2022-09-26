'use strict';

const { campaignStatus, campaignStatusDefault } = require("../src/constant/campaignStatus.enum");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Campaigns', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(6)
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(campaignStatus),
        defaultValue: campaignStatusDefault
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Campaigns');
  }
};