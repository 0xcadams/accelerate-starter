// Initializes the `cbsa` service on path `/cbsa`
import { v1LogModel } from '@accelerate-starter/core';
import { ServiceAddons } from '@feathersjs/feathers';
import { Log } from './log.class';
import { hooks } from './log.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    log: Log & ServiceAddons<any>; // tslint:disable-line
  }
}

const log = (app) => {
  const paginate = app.get('paginate');

  const options = {
    paginate,
    Model: v1LogModel
  };

  // Initialize our service with any options it requires
  app.use('/v1/log', new Log(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/log');

  service.hooks(hooks);
};

export { log };
