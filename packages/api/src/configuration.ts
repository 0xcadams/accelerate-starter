import { Application } from './declarations';

export default (app: Application) => {
  const conf = {
    paginate: false,
    authentication: {
      jwtOptions: {
        algorithm: 'HS256',
        audience: process.env.JWT_AUDIENCE || 'https://localhost:3443',
        expiresIn: '7d',
        header: { typ: 'access' },
        issuer: 'feathers'
      },
      local: {
        passwordField: 'password',
        usernameField: 'email'
      },
      path: '/authentication',
      secret: process.env.FEATHERS_AUTH_SECRET || 'abc123',
      entity: 'user',
      service: 'v1/user',
      authStrategies: ['jwt', 'local']
    }
  };

  Object.keys(conf).forEach((name) => {
    app.set(name, conf[name]);
  });
};
