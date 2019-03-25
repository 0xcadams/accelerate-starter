import { HookContext } from '@feathersjs/feathers';

const setUser = () => (context: HookContext) => {
  context.data.owner = context.params.user;
};

export { setUser };
