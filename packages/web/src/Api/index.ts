import feathers, { Paginated, Service } from '@feathersjs/feathers';

import authenticationClient from '@feathersjs/authentication-client';
import restClient from '@feathersjs/rest-client';
import { default as socketio } from '@feathersjs/socketio-client';

import isomorphicUnfetch from 'isomorphic-unfetch';
import socketIoClient from 'socket.io-client';

import {
  config as globalConfig,
  IMessage,
  IUser
} from '@accelerate-starter/core';

const app = feathers();

if (globalConfig.useSocketIo) {
  const socket = socketIoClient('/');
  app.configure(socketio(socket));
} else {
  const rest = restClient('/api');
  app.configure(rest.fetch(isomorphicUnfetch));
}

app.configure(
  authenticationClient({
    path: 'authentication',
    service: 'v1/user',
    storage:
      typeof localStorage === 'undefined' ? undefined : window.localStorage
  })
);

const servicePaths = {
  message: 'v1/message',
  user: 'v1/user'
};

const devWait = async (): Promise<boolean> => {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return true;
};

// USER

export const userService: Service<IUser> = app.service(servicePaths.user);

export const createUser = async (user: IUser): Promise<IUser> =>
  userService.create(user);

export const getUser = async (): Promise<IUser> =>
  userService.get(app.get('user'));

export const authenticateUser = async (user?: IUser): Promise<IUser> => {
  const response = await app.authenticate({
    strategy: user ? 'local' : '',
    ...user
  });

  const jwtPayload = await app.passport.verifyJWT(response.accessToken);

  const userResponse = await userService.get(jwtPayload.userId);

  app.set('user', userResponse);

  return userResponse;
};

export const logOutUser = async (): Promise<boolean | void> =>
  (await devWait()) && app.logout();

// MESSAGE

export const messageService: Service<IMessage> = app.service(
  servicePaths.message
);

messageService.hooks({
  before: {
    all: [
      async (context) => {
        await devWait();
        return context;
      }
    ]
  }
});

export const createMessage = async (message: IMessage): Promise<IMessage> =>
  messageService.create(message);

export const getAllMessages = async (): Promise<
  IMessage | IMessage[] | Paginated<IMessage>
> =>
  messageService.find({
    query: { $populate: 'owner' }
  });

export { app };
