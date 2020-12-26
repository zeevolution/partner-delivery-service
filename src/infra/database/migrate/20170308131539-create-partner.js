'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('partners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tradingName: {
        type: Sequelize.STRING
      },
      ownerName: {
        type: Sequelize.STRING
      },
      document: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      coverageArea: {
        type: Sequelize.JSON
      },
      address: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('partners');
  }
};
