const debug = require('debug')('app:middleware:logger');

const { createLogger } = require('winston');
const loggerOptions = require('./config');

const logger = () => {
  return async (req, res, next) => {
    try {
      req.app.locals.logger = await createLogger(loggerOptions);
      next();
    } catch (e) {
      debug('Error', e);
      console.error('Error:', e);
      return res.status(500).json({ message: 'logger error' });
    }
  };
};

module.exports = logger;
