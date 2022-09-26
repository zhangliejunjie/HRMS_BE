'use strict';

const { interviewStatus, interviewStatusDefault } = require("../src/constant/interviewStatus.enum");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Interviews', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(6)
      },
      room: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      start_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(interviewStatus),
        defaultValue: interviewStatusDefault
      },
      mark: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      Interviewer_id: {
        allowNull: false,
        type: Sequelize.STRING(6),
        references: {
          model: 'Staffs',
          key: 'id'
        }
      },
      CandidateDetail_id: {
        allowNull: false,
        type: Sequelize.STRING(6),
        references: {
          model: 'CandidateDetails',
          key: 'id'
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Interviews');
  }
};