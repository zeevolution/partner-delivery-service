const { attributes } = require('structure');

const Partner = attributes({
  id: Number,
  tradingName: {
    type: String
  },
  ownerName: {
    type: String
  },
  document: {
    type: String,
    required: true,
  },
  coverageArea: {
    type: Object
  },
  address: {
    type: Object
  }
})(class Partner {
});

module.exports = Partner;
