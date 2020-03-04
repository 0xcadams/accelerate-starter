// Initializes the `cbsa` service on path `/cbsa`
import { ServiceAddons } from '@feathersjs/feathers';

import { v1UserModel } from '@accelerate-starter/core';

import newPassword from './services/new-password';
import passwordReset from './services/password-reset';
import verify from './services/verify';

import { User } from './user.class';
import { hooks } from './user.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    user: User & ServiceAddons<any>; // tslint:disable-line
  }
}

const user = (app) => {
  const paginate = app.get('paginate');

  const options = {
    paginate,
    Model: v1UserModel
  };

  // Initialize our service with any options it requires
  app.use('/v1/user', new User(options, app));

  // Create a password reset and verify endpoint
  app.post('/v1/user/password-reset', passwordReset());
  app.post('/v1/user/verify', verify(app));
  app.post('/v1/user/new-password', newPassword(app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/user');

  service.hooks(hooks);
};

export { user };
