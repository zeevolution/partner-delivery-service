const Partner = require('src/domain/partner/Partner');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      tradingName,
      ownerName,
      document,
      coverageArea,
      address
    } = dataValues;

    return new Partner({
      id,
      tradingName,
      ownerName,
      document,
      coverageArea,
      address
    });
  },

  toDatabase(survivor) {
    const {
      tradingName,
      ownerName,
      document,
      coverageArea,
      address
    } = survivor;

    return {
      tradingName,
      ownerName,
      document,
      coverageArea,
      address
    };
  }
};

module.exports = SequelizeUserMapper;
