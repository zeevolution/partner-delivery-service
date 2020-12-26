'use strict';

module.exports = function(sequelize, DataTypes) {
  const Partner = sequelize.define('partner', {
    tradingName: DataTypes.STRING,
    ownerName: DataTypes.STRING,
    document: DataTypes.STRING,
    coverageArea: DataTypes.JSON,
    address: DataTypes.JSON,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return Partner;
};
