import { Application } from '@feathersjs/express';

export const config = (app: Application<string>) => {
  const isProd = process.env.NODE_ENV === 'production';

  const conf = {
    authentication: {
      cookie: {
        enabled: true,
        httpOnly: isProd,
        name: 'accelerate-jwt',
        secure: isProd
      },
      header: 'Authorization',
      jwt: {
        algorithm: 'HS256',
        audience: process.env.JWT_AUDIENCE || 'http://localhost:3000',
        expiresIn: '1d',
        header: { typ: 'access' },
        issuer: 'feathers',
        subject: 'anonymous'
      },
      local: {
        entity: 'user',
        passwordField: 'password',
        usernameField: 'email'
      },
      path: '/authentication',
      secret: process.env.AUTH_SECRET || '1d14ef126b73c46e07f',
      service: 'v1/user',
      strategies: ['jwt', 'local']
    },
    mongodb:
      process.env.MONGODB_URL || 'mongodb://localhost:27017/accelerate-starter',
    paginate: { default: 10, max: 50 },
    port: process.env.PORT || 3030
  };

  Object.keys(conf).forEach((name) => {
    app.set(name, conf[name]);
  });
};
