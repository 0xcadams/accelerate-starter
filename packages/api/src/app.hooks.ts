// Application hooks that run for every service
import log from './hooks/log';

export default {
  before: {
    all: [log()],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  },

  after: {
    all: [log()],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  },

  error: {
    all: [log()],
    create: [],
    find: [],
    get: [],
    patch: [],
    remove: [],
    update: []
  }
};
