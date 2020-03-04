import { disallow } from 'feathers-hooks-common';
import { addUserInfo } from './hooks/add-user-info';
import { sendEmailToSupport } from './hooks/send-email-to-support';

const hooks = {
  before: {
    all: [],
    create: [sendEmailToSupport(), addUserInfo()],
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
