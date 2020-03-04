import client from '@feathersjs/client';
import { Paginated } from '@feathersjs/feathers';
import router from 'next/router';

import axios from 'axios';

import lodashMerge from 'lodash.merge';

import {
  IMessage,
  INewPasswordRequest,
  IPasswordResetRequest,
  ISupportRequest,
  IUser,
  ServicePaths
} from '@accelerate-starter/core';

import { reduxPersistKey } from '@redux/store';

import { logTimingEnd, logTimingStart, logUserId } from './analytics';

const app = client<ServicePaths>();

const axiosInstance = axios.create({
  timeout: 10000
});

const rest = client.rest('/api');
app.configure(rest.axios(axiosInstance));

app.configure(
  client.authentication({
    path: 'authentication'
  })
);

const devWait = async (): Promise<boolean> => {
  if (process.env.NODE_ENV === 'development') {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // custom wait to ensure that UI handles slow requests
  }

  return true;
};

// ROUTER

export const pushHome = async () => router.push('/');

// USER

export const userService = app.service('v1/user');

userService.hooks({
  before: {
    all: [
      async (context) => {
        await devWait();
        logTimingStart({ service: 'v1/user', method: context.method });
        return context;
      }
    ]
  },
  after: {
    all: [
      async (context) => {
        await devWait();
        logTimingEnd({ service: 'v1/user', method: context.method });
        return context;
      }
    ]
  }
});

export const createUser = async (user: IUser): Promise<IUser> => {
  const newUser = await userService.create(user);
  logUserId(newUser._id);
  return newUser;
};

export const patchUser = async (
  user: Partial<IUser>
): Promise<IUser | null> => {
  console.log({ user });
  const authUser = await app.get('authentication');

  try {
    if (authUser && authUser.user && authUser.user._id) {
      return userService.patch(
        authUser.user._id,
        lodashMerge(authUser.user, user)
      );
    }
  } catch (e) {
    console.error(e);
  }

  return authUser.user;
};

export const getUser = async (): Promise<IUser> => {
  const user = await userService.get(
    (await app.get('authentication')).user._id
  );

  logUserId(user._id);

  return user;
};

export const authenticateUser = async (user?: IUser): Promise<IUser> => {
  let response;

  if (!user) {
    response = await app.reAuthenticate();
  } else {
    response = await app.authenticate({
      strategy: 'local',
      ...user
    });
  }

  logUserId(response.user._id);

  return response.user;
};

export const deleteUser = async (): Promise<void> => {
  const userId = (await app.get('authentication')).user._id;

  try {
    await userService.remove(userId);
  } catch (e) {}

  await logOutUser();
};

export const verifyUser = async (verifyKey: string): Promise<void> => {
  return axiosInstance.post('/api/v1/user/verify', { verifyKey });
};

export const logOutUser = async (): Promise<void> => {
  app.logout();

  if (localStorage) {
    localStorage.removeItem(`persist:${reduxPersistKey}`); // remove redux persist entry
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  const request: IPasswordResetRequest = { email };
  return axiosInstance.post('/api/v1/user/password-reset', request);
};

export const newPassword = async (
  request: INewPasswordRequest
): Promise<void> => {
  return axiosInstance.post('/api/v1/user/new-password', request);
};

// SUPPORT REQUEST

export const supportRequestService = app.service('v1/support-request');

supportRequestService.hooks({
  before: {
    all: [
      async (context) => {
        await devWait();
        return context;
      }
    ]
  }
});

export const createSupportRequest = async (
  supportRequest: ISupportRequest
): Promise<ISupportRequest> => supportRequestService.create(supportRequest);

// MESSAGE

export const messageService = app.service('v1/message');

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

export const createMessage = async (message: IMessage): Promise<IMessage> => {
  await messageService.create(message);
  return message;
};

export const getMessages = async (): Promise<
  IMessage | IMessage[] | Paginated<IMessage>
> =>
  messageService.find({
    query: { $populate: 'user' }
  });

export { app, router };
