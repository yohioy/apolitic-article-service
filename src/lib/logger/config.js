const { format, transports } = require('winston');
const config = require('config');

const LoggerConfig = config.get('Logger');

const customLevels = {
  levels: {
    info: 1,
    success: 2,
    warning: 3,
    error: 4,
    critical: 5,
  },
};

const consoleTransport = () => {
  return new transports.Console({ level: LoggerConfig.level });
};

const options = {
  levels: customLevels.levels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [consoleTransport()],
};

module.exports = options;
