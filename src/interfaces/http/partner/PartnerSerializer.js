const PartnerSerializer = {
  serialize({ id, tradingName, ownerName,
    document, coverageArea, address }) {
    return {
      id,
      tradingName,
      ownerName,
      document,
      coverageArea,
      address
    };
  }
};

module.exports = PartnerSerializer;
