// Initializes the `cbsa` service on path `/cbsa`
import { v1ReduxHistoryModel } from '@accelerate-starter/core';
import { ServiceAddons } from '@feathersjs/feathers';
import { ReduxHistory } from './redux-history.class';
import { hooks } from './redux-history.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    reduxHistory: ReduxHistory & ServiceAddons<any>; // tslint:disable-line
  }
}

const reduxHistory = (app) => {
  const paginate = app.get('paginate');

  const options = {
    paginate,
    Model: v1ReduxHistoryModel
  };

  // Initialize our service with any options it requires
  app.use('/v1/redux-history', new ReduxHistory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/redux-history');

  service.hooks(hooks);
};

export { reduxHistory };
