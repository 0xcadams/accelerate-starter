import { IUser } from '@accelerate-starter/core';
import feathers from '@feathersjs/feathers';
import { expect } from 'chai';
import { gravatar } from './gravatar';

describe("'gravatar' hook", () => {
  let app;

  beforeEach(() => {
    app = feathers();

    // A dummy users service for testing
    app.use('/user', {
      async create(data) {
        return data;
      }
    });

    // Add the hook to the dummy service
    app.service('user').hooks({
      before: {
        create: gravatar()
      }
    });
  });

  it('creates a gravatar link from the users email', async () => {
    const userBody: IUser = {
      email: 'c@cadams.io',
      password: 'test123'
    };

    const user = await app.service('user').create(userBody);

    expect(user.email).to.eq('c@cadams.io');
    expect(user.avatar).to.contain(
      'https://s.gravatar.com/avatar/cc7b4c63db1fe4cfaa69ee60dea689e8'
    );
  });
});
