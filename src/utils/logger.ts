// import { existsSync, mkdirSync } from 'fs';
// import { join } from 'path';
// import winston from 'winston';
// import winstonDaily from 'winston-daily-rotate-file';
// import { LOG_DIR, NODE_ENV } from '@config';

// // logs dir
// const logDir: string = join(__dirname, LOG_DIR);

// if (!existsSync(logDir) && NODE_ENV !== 'production') {
//   mkdirSync(logDir);
// }

// // Define log format
// const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

// let transports = [
//   // error log setting
//   new winstonDaily({
//     level: 'error',
//     datePattern: 'YYYY-MM-DD',
//     dirname: logDir + '/error',
//     filename: `%DATE%.log`,
//     maxFiles: 30,
//     handleExceptions: true,
//     json: false,
//     zippedArchive: true,
//   }),
// ];

// if (NODE_ENV !== 'production') {
//   transports.push(
//     // debug log setting
//     new winstonDaily({
//       level: 'debug',
//       datePattern: 'YYYY-MM-DD',
//       dirname: logDir + '/debug',
//       filename: `%DATE%.log`,
//       maxFiles: 30,
//       json: false,
//       zippedArchive: true,
//     })
//   );
// }

// const logger = winston.createLogger({
//   format: winston.format.combine(
//     winston.format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     logFormat,
//   ),
//   transports: transports,
// });

// if (NODE_ENV !== 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
//     }),
//   );
// }

// const stream = {
//   write: (message: string) => {
//     logger.info(message.substring(0, message.lastIndexOf('\n')));
//   },
// };

// export { logger, stream };

import winston from 'winston';

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // console log setting
    new winston.transports.Console({
      format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
    }),
  ],
});

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export { logger, stream };

