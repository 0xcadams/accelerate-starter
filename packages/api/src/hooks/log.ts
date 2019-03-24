// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
import { HookContext } from '@feathersjs/feathers';
import * as util from 'util';
import { logger } from '../logger';

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

const log = () => {
  return (context: HookContext) => {
    // This debugs the service call and a stringified version of the hook context
    // You can customize the message (and logger) to your needs
    logger.debug(
      `${context.type} app.service('${context.path}').${context.method}()`
    );

    if (context.error && !context.result) {
      logger.error(context.error.stack);
    }
  };
};

export { log };
