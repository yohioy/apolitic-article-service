const debug = require('debug')('app:lib:mongoose');

const mongoose = require('mongoose');
const { uri, options } = require('./config');

const connection = () => {
  return async (req, res, next) => {
    try {
      await mongoose.connect(uri, options);
      next();
    } catch (e) {
      debug('Error', e);
      res.status(500).json({ message: 'Database connection error' });
    }
  };
};

module.exports = connection;
