// Initializes the `message` service on path `/v1/message`
import { createModel } from '../../../models/v1/message.model';
import { default as createService } from 'feathers-mongoose';
import { hooks } from './message.hooks';

const message = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/v1/message', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/message');

  service.hooks(hooks);
};

export { message };
