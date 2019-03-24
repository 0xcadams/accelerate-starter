import { hooks as authHooks } from '@feathersjs/authentication';
import { hooks as localHooks } from '@feathersjs/authentication-local';

import { gravatar } from './hooks/gravatar';

const hooks = {
  before: {
    all: [],
    create: [localHooks.hashPassword(), gravatar()],
    find: [authHooks.authenticate('jwt')],
    get: [authHooks.authenticate('jwt')],
    patch: [localHooks.hashPassword(), authHooks.authenticate('jwt')],
    remove: [authHooks.authenticate('jwt')],
    update: [localHooks.hashPassword(), authHooks.authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      localHooks.protect('password')
    ],
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
