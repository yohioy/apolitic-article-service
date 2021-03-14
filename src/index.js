const debug = require('debug')('app');

const Express = require('express');
const cors = require('cors');
const config = require('config');
const routes = require('./routes');
const mongoose = require('./lib/mongoose');
const { cookieTokenHandler } = require('./lib/cookie_tokens');

const app = new Express();

debug(`Server: start`);

const AppConfig = config.get('App');

// Allow cors everywhere
app.use(cors());

// mongo db as a middleware
app.use(mongoose());

// cookie middleware
app.use(cookieTokenHandler);

// route handler
app.use('/api/', routes);

if (require.main === module) {
  app.listen(AppConfig.port, () => {
    console.log(`Server running on http://${AppConfig.host}:${AppConfig.port}`);
  });
}
module.exports = app;
