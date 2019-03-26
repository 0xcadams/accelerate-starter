import authentication from '@feathersjs/authentication';
import authenticationJwt from '@feathersjs/authentication-jwt';
import authenticationLocal from '@feathersjs/authentication-local';

const auth = (app) => {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(authenticationJwt());
  app.configure(authenticationLocal());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate('jwt')]
    }
  });
};

export { auth };
