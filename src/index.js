const debug = require('debug')('app');

const Express = require('express');
const cors = require('cors');
const config = require('config');
const routes = require('./routes');

const app = new Express();

debug(`Server: start`);

const AppConfig = config.get('App');

// Allow cors everywhere
app.use(cors());

// route handler
app.use('/api/', routes);

if (require.main === module) {
  app.listen(AppConfig.port, () => {
    console.log(`Server running on http://${AppConfig.host}:${AppConfig.port}`);
  });
}
module.exports = app;
