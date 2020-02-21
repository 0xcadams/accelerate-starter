import { HookContext } from '@feathersjs/feathers';

import { IUser } from '@accelerate-starter/core';

export const addRequestDataToUser = () => async (context: HookContext) => {
  const { app, params } = context;

  const user: IUser = params.user;

  if (!user) {
    return context;
  }

  const dbUser: IUser = await app.service('v1/user').get(user._id);

  const ipList = new Set<string>(dbUser.ipList || []);
  ipList.add(String(context.params.clientIp));

  const userAgentList = new Set<string>(dbUser.userAgents || []);
  userAgentList.add(
    context.params.clientUserAgent && context.params.clientUserAgent.source
  );

  await app
    .service('v1/user')
    .patch(user._id, { ipList: [...ipList], userAgents: [...userAgentList] });

  return context;
};
