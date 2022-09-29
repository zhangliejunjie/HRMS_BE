'use strict';

const { applyStatus, applyStatusDefault } = require("../src/constant/cvStatus.enum.js");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CandidateDetails', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(6)
      },
      identity_number: {
        allowNull: false,
        type: Sequelize.STRING(12)
      },
      resume_url: {
        allowNull: false,

        type: Sequelize.TEXT
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      applied_status: {
        allowNull: false,
        type: Sequelize.ENUM(applyStatus),
        defaultValue: applyStatusDefault
      },
      dob: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      adress: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      Job_id: {
        allowNull: false,
        type: Sequelize.STRING(6),
        references: {
          model: 'Jobs',
          key: 'id'
        }
      },
      HRStaff_id: {
        allowNull: false,
        type: Sequelize.STRING(6),
        references: {
          model: 'Staffs',
          key: 'id'
        },
      },
      Member_id: {
        allowNull: false,
        type: Sequelize.STRING(6),
        references: {
          model: 'Members',
          key: 'id'
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CandidateDetails');
  }
};