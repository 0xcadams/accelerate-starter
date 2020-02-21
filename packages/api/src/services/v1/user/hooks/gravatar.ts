import { IUser } from '@accelerate-starter/core';
import { HookContext } from '@feathersjs/feathers';
import * as gravatarService from 'gravatar';

import { fetch } from '../../../../util/fetch';

const gravatar = () => async (context: HookContext) => {
  const user: IUser = context.data;
  if (!user.avatar) {
    const url = gravatarService.url(
      context.data.email,
      { s: '200', r: 'x', d: '404' },
      true
    );

    const response = await fetch(url);

    if (response.ok) {
      context.data.avatar = url;
    }
  }

  return context;
};

export { gravatar };
