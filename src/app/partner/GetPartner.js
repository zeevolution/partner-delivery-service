const Operation = require('src/app/Operation');

class GetPartner extends Operation {
  constructor({ partnersRepository }) {
    super();
    this.partnersRepository = partnersRepository;
  }

  async execute(partnerId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const partner = await this.partnersRepository.getById(partnerId);
      this.emit(SUCCESS, partner);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetPartner.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetPartner;
