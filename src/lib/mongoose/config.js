const config = require('config');
const DbConfig = config.get('Db');

const uri = `mongodb://${DbConfig.host}:${DbConfig.port}/${DbConfig.name}`;

const options = {
  auth: {
    user: DbConfig.username,
    password: DbConfig.password,
  },
  authSource: 'admin',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  ssl: false,
};

module.exports = { uri, options };
