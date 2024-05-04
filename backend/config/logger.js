const winston = require('winston');
const config = require('./config');

// Custom formatter for handling errors by logging the stack trace
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    return Object.assign(info, { message: info.stack });
  }
  return info;
});


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize() ,
       winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({ filename: 'syslog.txt' }),
  ],
});

module.exports = logger;
