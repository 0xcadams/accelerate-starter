import { hooks as authHooks } from '@feathersjs/authentication';
import { hooks as localHooks } from '@feathersjs/authentication-local';
import { discard } from 'feathers-hooks-common';

import { addRequestDataToUser } from '../../../hooks/add-request-data-to-user';

import { cleanse } from './hooks/cleanse-user';
import { gravatar } from './hooks/gravatar';
import { sendEmailToUser } from './hooks/send-email-to-user';

const hooks = {
  before: {
    all: [],
    create: [
      discard('isUnlocked'),
      localHooks.hashPassword('password'),
      cleanse(),
      gravatar()
    ],
    find: [authHooks.authenticate('jwt')],
    get: [authHooks.authenticate('jwt')],
    patch: [
      discard('isUnlocked'),
      localHooks.hashPassword('password'),
      authHooks.authenticate('jwt')
    ],
    remove: [authHooks.authenticate('jwt')],
    update: [
      discard('isUnlocked'),
      cleanse(),
      localHooks.hashPassword('password'),
      authHooks.authenticate('jwt')
    ]
  },

  after: {
    all: [
      // Make sure certain fields are never sent to the client
      // Always must be the last hook
      localHooks.protect(
        'password',
        'verifyKey',
        'isOnMarketingList',
        'ipList',
        'userAgents'
      )
    ],
    create: [sendEmailToUser(), addRequestDataToUser()],
    find: [addRequestDataToUser()],
    get: [addRequestDataToUser()],
    patch: [addRequestDataToUser()],
    remove: [],
    update: [addRequestDataToUser()]
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
