import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { default as feathersExpress } from '@feathersjs/express';

import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';

import { logger } from './logger';

import { hooks } from './app.hooks';
import { channels } from './channels';
import { middleware } from './middleware';
import { services } from './services';

import { auth } from './authentication';
import { config } from './configuration';
import { mongooseClient } from './mongoose';

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

const app = feathersExpress(feathers());

// Load app configuration
app.configure(config);

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(feathersExpress.json());
app.use(feathersExpress.urlencoded({ extended: true }));
// app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
// app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(feathersExpress.rest());
// app.configure(socketio());

app.configure(mongooseClient);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(auth);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(feathersExpress.notFound());
app.use(feathersExpress.errorHandler({ logger }));

app.hooks(hooks);

const api = feathersExpress(feathers()).use('/api', app);
app.setup(api);

export default api;
