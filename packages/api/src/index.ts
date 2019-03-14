import app from './app';
import { logger } from './logger';

const port = app.get('port') || 3030;
const server = app.listen(port);

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host') || 'localhost',
    port
  )
);
