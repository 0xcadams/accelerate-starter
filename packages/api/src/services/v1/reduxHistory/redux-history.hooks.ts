import { hooks as authHooks } from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
import { addUserInfo } from './hooks/add-user-info';

const hooks = {
  before: {
    all: [authHooks.authenticate('jwt')],
    create: [addUserInfo()],
    find: [disallow()],
    get: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
    update: [disallow()]
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
