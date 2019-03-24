import { hooks as authHooks } from '@feathersjs/authentication';
import { populateUser } from './hooks/populate-user';

const hooks = {
  before: {
    all: [authHooks.authenticate('jwt')],
    create: [populateUser()],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  },

  after: {
    all: [],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  },

  error: {
    all: [],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  }
};

export { hooks };
