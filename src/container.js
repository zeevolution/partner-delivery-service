const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  GetAllPartners,
  GetPartner
} = require('./app/partner');

const PartnerSerializer = require('./interfaces/http/partner/PartnerSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizePartnersRepository = require('./infra/partner/SequelizePartnersRepository');
const { database, Partner: PartnerModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  partnersRepository: asClass(SequelizePartnersRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  PartnerModel: asValue(PartnerModel)
});

// Operations
container.register({
  getAllPartners: asClass(GetAllPartners),
  getPartner: asClass(GetPartner)
});

// Serializers
container.register({
  partnerSerializer: asValue(PartnerSerializer)
});

module.exports = container;
