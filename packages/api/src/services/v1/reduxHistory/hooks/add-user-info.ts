import { IReduxHistory, IUser } from '@accelerate-starter/core';
import errors from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

const addUserInfo = () => async (context: HookContext) => {
  const reduxHistory: IReduxHistory = context.data;

  if (!context.params || !context.params.user) {
    throw new errors.Forbidden('No user was provided to params.');
  }

  const user: IUser = context.params.user;

  reduxHistory.user = user;

  context.data = reduxHistory;

  return context;
};

export { addUserInfo };
