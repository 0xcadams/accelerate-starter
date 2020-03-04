// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
import { HookContext } from '@feathersjs/feathers';
import logger from '../logger';

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

export default () => {
  return (context: HookContext) => {
    // This debugs the service call and a stringified version of the hook context
    // You can customize the message (and logger) to your needs
    logger.debug(
      `${context.type} app.service('${context.path}').${context.method}()`
    );

    if (context.error) {
      logger.error({
        stack: context.error.stack,
        user: context.params && context.params.user && context.params.user._id
      });
    }
  };
};
