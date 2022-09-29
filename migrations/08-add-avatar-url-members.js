'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'members',
            'avatar_url',
            Sequelize.TEXT,
        );
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'members',
            'avatar_url'
        );
    }
};


