const PartnerMapper = require('./SequelizePartnerMapper');

class SequelizePartnersRepository {
  constructor({ PartnerModel }) {
    this.PartnerModel = PartnerModel;
  }

  async getAll(...args) {
    const users = await this.PartnerModel.findAll(...args);

    return users.map(PartnerMapper.toEntity);
  }

  async getById(id) {
    const user = await this._getById(id);

    return PartnerMapper.toEntity(user);
  }

  async add(user) {
    const { valid, errors } = user.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newUser = await this.PartnerModel
      .create(PartnerMapper.toDatabase(user));

    return PartnerMapper.toEntity(newUser);
  }

  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
  }

  async update(id, newData) {
    const user = await this._getById(id);

    const transaction = await this.PartnerModel.sequelize.transaction();

    try {
      const updatedUser = await user.update(newData, { transaction });
      const userEntity = PartnerMapper.toEntity(updatedUser);

      const { valid, errors } = userEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return userEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.PartnerModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.PartnerModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Partner with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizePartnersRepository;
