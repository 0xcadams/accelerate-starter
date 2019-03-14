import { message } from './v1/message/message.service';
import { user } from './v1/user/user.service';

const services = (app) => {
  app.configure(user);
  app.configure(message);
};

export { services };
