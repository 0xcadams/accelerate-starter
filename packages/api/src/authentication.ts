import {
  AuthenticationBaseStrategy,
  AuthenticationService,
  JWTStrategy
} from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { ServiceAddons } from '@feathersjs/feathers';

import { Application } from './declarations';

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>; // tslint:disable-line
  }
}

export default (app: Application) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register(
    'local',
    (new LocalStrategy() as unknown) as AuthenticationBaseStrategy // hack around strange hoisting issue
  );

  app.use('/authentication', authentication);
};
