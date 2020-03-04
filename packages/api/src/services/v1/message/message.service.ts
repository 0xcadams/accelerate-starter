import { v1MessageModel } from '@accelerate-starter/core';
import { ServiceAddons } from '@feathersjs/feathers';
import { Message } from './message.class';
import { hooks } from './message.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    message: Message & ServiceAddons<any>; // tslint:disable-line
  }
}

const message = (app) => {
  const paginate = app.get('paginate');

  const options = {
    paginate,
    Model: v1MessageModel,
    whitelist: ['$populate']
  };

  // Initialize our service with any options it requires
  app.use('/v1/message', new Message(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/message');

  service.hooks(hooks);
};

export { message };
