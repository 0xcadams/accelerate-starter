// Initializes the `cbsa` service on path `/cbsa`
import { v1SupportRequestModel } from '@accelerate-starter/core';
import { ServiceAddons } from '@feathersjs/feathers';
import { SupportRequest } from './support-request.class';
import { hooks } from './support-request.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    supportRequest: SupportRequest & ServiceAddons<any>; // tslint:disable-line
  }
}

const supportRequest = (app) => {
  const paginate = app.get('paginate');

  const options = {
    paginate,
    Model: v1SupportRequestModel
  };

  // Initialize our service with any options it requires
  app.use('/v1/support-request', new SupportRequest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/support-request');

  service.hooks(hooks);
};

export { supportRequest };
