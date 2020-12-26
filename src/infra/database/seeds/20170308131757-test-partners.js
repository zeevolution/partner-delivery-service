'use strict';

const data = require('src/infra/support/data');

module.exports = {
  up: function (queryInterface) {
    const testUsers = [];

    for(let i = 0; i < data.pdvs.length; i++) {
      testUsers.push({
        tradingName: data.pdvs[i].tradingName,
        ownerName: data.pdvs[i].ownerName,
        document: data.pdvs[i].document,
        coverageArea: JSON.stringify(data.pdvs[i].coverageArea),
        address: JSON.stringify(data.pdvs[i].address),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('partners', testUsers, {});
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('partners', null, {});
  }
};
