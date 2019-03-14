import { hooks as authHooks } from '@feathersjs/authentication';

const hooks = {
  before: {
    all: [authHooks.authenticate('jwt')],
    create: [],
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
