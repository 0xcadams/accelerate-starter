import { createLogger, format, Logger, transports } from 'winston';

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger: Logger = createLogger({
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  level: 'info',
  transports: [
    new transports.Console()
  ]
});

export { logger };
