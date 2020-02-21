import app from './app';
import logger from './logger';

const port = process.env.PORT || 3030;
const server = app.listen(port);

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    process.env.HOST || 'localhost',
    port
  )
);
