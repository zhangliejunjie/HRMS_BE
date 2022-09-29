'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'staffs',
      'avatar_url',
      Sequelize.TEXT,
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'staffs',
      'avatar_url',
    );
  }
};
