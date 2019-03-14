// Initializes the `user` service on path `/user`
import { createModel } from '../../../models/v1/user.model';
import { default as createService } from 'feathers-mongoose';
import { hooks } from './user.hooks';

const user = (app) => {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/v1/user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/user');

  service.hooks(hooks);
};

export { user };
