'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
      },
      Interview_id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.STRING(36),
        references: {
          model: "Interviews",
          key: "id",
        }
      },
      Interviewer_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: "Staffs",
          key: "id",
        },
      },
      mark: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      comment: {
        allowNull: true,
        type: Sequelize.TEXT
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reports');
  }
};