import { Application } from '../declarations';

import { log } from './v1/log/log.service';
import { reduxHistory } from './v1/reduxHistory/redux-history.service';
import { supportRequest } from './v1/supportRequest/support-request.service';
import { user } from './v1/user/user.service';

export default (app: Application) => {
  app.configure(user);
  app.configure(log);
  app.configure(supportRequest);
  app.configure(reduxHistory);
};
