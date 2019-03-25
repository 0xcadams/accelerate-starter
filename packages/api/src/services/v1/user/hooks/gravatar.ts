import { IUser } from '@accelerate-starter/core';
import { HookContext } from '@feathersjs/feathers';
import * as gravatarService from 'gravatar';

const gravatar = () => (context: HookContext) => {
  const user: IUser = context.data;
  if (!user.avatar) {
    context.data.avatar = gravatarService.url(
      context.data.email,
      { s: '100', r: 'x', d: 'retro' },
      true
    );
  }
};

export { gravatar };
