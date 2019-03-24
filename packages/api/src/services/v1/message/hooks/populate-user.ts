import { HookContext } from '@feathersjs/feathers';

const populateUser = () => (context: HookContext) => {
  context.data.owner = context.params.user;
};

export { populateUser };
