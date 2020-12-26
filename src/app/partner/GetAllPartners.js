const Operation = require('src/app/Operation');

class GetAllPartners extends Operation {
  constructor({ partnersRepository }) {
    super();
    this.partnersRepository = partnersRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const users = await this.partnersRepository.getAll({
        attributes: ['id', 'tradingName', 'ownerName',
          'document', 'coverageArea', 'address']
      });

      this.emit(SUCCESS, users);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllPartners.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllPartners;
