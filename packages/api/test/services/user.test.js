const app = require('../../src/app');

describe('\'user\' service', () => {
  it('registered the service', () => {
    const service = (app) => app.service('user');
    expect(service).toBeTruthy();
  });
});
