import express from '@feathersjs/express';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio';

import compression from 'compression';
import cors from 'cors';
import expressUseragent from 'express-useragent';
import helmet from 'helmet';
import requestIp from 'request-ip';

import * as Sentry from '@sentry/node';

import { config as globalConfig } from '@accelerate-starter/core';

import logger from './logger';

import appHooks from './app.hooks';
import channels from './channels';
import configuration from './configuration';
import middleware from './middleware';
import services from './services';

import authentication from './authentication';
import mongoose from './mongoose';

Sentry.init({
  dsn: process.env.SENTRY_DSN_API,
  release: `@accelerate-starter/api`
});

const app = express(feathers());

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// Load app configuration
app.configure(configuration);

// Enable security, CORS, compression, favicon and body parsing
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable IP and user agent parsing from request
app.use(requestIp.mw());
app.use(expressUseragent.express());
app.use((req, _res, next) => {
  req.feathers = {
    ...req.feathers,
    clientIp: req.clientIp,
    clientUserAgent: req.useragent
  };
  next();
});

// Set up Plugins and providers
if (globalConfig.useSocketIo) {
  app.configure(socketio());
} else {
  app.configure(express.rest());
}

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

let api = app;

if (!globalConfig.useSocketIo) {
  api = express(feathers());
  api.use('/api', app);

  app.setup(api);
}

export default api;
