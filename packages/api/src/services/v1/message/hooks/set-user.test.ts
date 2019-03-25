import { IMessage, IUser } from '@accelerate-starter/core';
import feathers from '@feathersjs/feathers';
import { expect } from 'chai';
import * as feathersMemory from 'feathers-memory';
import { setUser } from './set-user';

describe("'set-user' hook", () => {
  let app;
  let user: IUser;

  beforeEach(async () => {
    // Database adapter pagination options
    const options = {
      paginate: {
        default: 10,
        max: 25
      }
    };

    app = feathers();

    // Register `user` and `message` service in-memory
    app.use('/user', feathersMemory(options));
    app.use('/message', feathersMemory(options));

    // Add the hook to the dummy service
    app.service('message').hooks({
      before: setUser()
    });

    const userBody: IUser = {
      email: 'test@example.com',
      password: 'test123'
    };

    // Create a new user we can use to test with
    user = await app.service('user').create(userBody);
  });

  it('populates a new message with the user', async () => {
    const messageBody: IMessage = {
      body: 'A test message'
    };

    const message: IMessage = await app
      .service('message')
      .create(messageBody, { user });

    // Make sure that user got added to the returned message
    expect(message.body).to.deep.eq(messageBody.body);
    expect(message.owner).to.deep.eq(user);
  });
});
