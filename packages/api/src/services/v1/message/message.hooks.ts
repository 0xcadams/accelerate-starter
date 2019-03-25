import { hooks as authHooks } from '@feathersjs/authentication';
import { populateUser } from './hooks/populate-user';
import { setUser } from './hooks/set-user';

const hooks = {
  before: {
    all: [authHooks.authenticate('jwt')],
    create: [setUser()],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  },

  after: {
    all: [populateUser()],
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
