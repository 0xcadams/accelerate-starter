import authentication from '@feathersjs/authentication';
import authenticationJwt from '@feathersjs/authentication-jwt';
import authenticationLocal from '@feathersjs/authentication-local';
import authenticationOauth2 from '@feathersjs/authentication-oauth2';
import { default as FacebookStrategy } from 'passport-facebook';
import { default as GoogleStrategy } from 'passport-google-oauth20';

const auth = (app) => {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(authenticationJwt());
  app.configure(authenticationLocal());

  // app.configure(
  //   authenticationOauth2(
  //     Object.assign(
  //       {
  //         Strategy: GoogleStrategy,
  //         name: 'google'
  //       },
  //       config.google
  //     )
  //   )
  // );

  // app.configure(
  //   authenticationOauth2(
  //     Object.assign(
  //       {
  //         Strategy: FacebookStrategy,
  //         name: 'facebook'
  //       },
  //       config.facebook
  //     )
  //   )
  // );

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('api/authentication').hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate('jwt')]
    }
  });
};

export { auth };
