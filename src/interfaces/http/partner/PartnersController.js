const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const PartnersController = {
  get router() {
    const router = Router();

    router.use(inject('partnerSerializer'));

    router.get('/', inject('getAllPartners'), this.index);
    router.get('/:id', inject('getPartner'), this.show);
    router.post('/', inject('createPartner'), this.create);
    router.put('/:id', inject('updatePartner'), this.update);
    router.delete('/:id', inject('deletePartner'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllPartners, partnerSerializer } = req;
    const { SUCCESS, ERROR } = getAllPartners.outputs;

    getAllPartners
      .on(SUCCESS, (partners) => {
        res
          .status(Status.OK)
          .json(partners.map(partnerSerializer.serialize));
      })
      .on(ERROR, next);

    getAllPartners.execute();
  },

  show(req, res, next) {
    const { getPartner, partnerSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getPartner.outputs;

    getPartner
      .on(SUCCESS, (user) => {
        res
          .status(Status.OK)
          .json(partnerSerializer.serialize(user));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getPartner.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createPartner, partnerSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createPartner.outputs;

    createPartner
      .on(SUCCESS, (user) => {
        res
          .status(Status.CREATED)
          .json(partnerSerializer.serialize(user));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    createPartner.execute(req.body);
  },

  update(req, res, next) {
    const { updatePartner, partnerSerializer } = req;
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = updatePartner.outputs;

    updatePartner
      .on(SUCCESS, (user) => {
        res
          .status(Status.ACCEPTED)
          .json(partnerSerializer.serialize(user));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    updatePartner.execute(Number(req.params.id), req.body);
  },

  delete(req, res, next) {
    const { deletePartner } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = deletePartner.outputs;

    deletePartner
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    deletePartner.execute(Number(req.params.id));
  }
};

module.exports = PartnersController;
