import { Application } from '@feathersjs/express';

export const config = (app: Application<string>) => {
  const isProd = process.env.NODE_ENV === 'production';

  const conf = {
    port: process.env.PORT || 3030,
    paginate: { default: 10, max: 50 },
    authentication: {
      secret: process.env.AUTH_SECRET || '1d14ef126b73c46e07f',
      strategies: ['jwt', 'local'],
      path: '/authentication',
      service: 'v1/user',
      header: 'Authorization',
      jwt: {
        header: { typ: 'access' },
        audience: process.env.JWT_AUDIENCE || 'http://localhost:3000',
        subject: 'anonymous',
        issuer: 'feathers',
        algorithm: 'HS256',
        expiresIn: '1d'
      },
      local: {
        entity: 'user',
        usernameField: 'email',
        passwordField: 'password'
      },
      // google: {
      //   clientID: "your google client id",
      //   clientSecret: "your google client secret",
      //   successRedirect: "/",
      //   scope: ["profile openid email"]
      // },
      // facebook: {
      //   clientID: "your facebook client id",
      //   clientSecret: "your facebook client secret",
      //   successRedirect: "/",
      //   scope: ["public_profile", "email"],
      //   profileFields: [
      //     "id",
      //     "displayName",
      //     "first_name",
      //     "last_name",
      //     "email",
      //     "gender",
      //     "profileUrl",
      //     "birthday",
      //     "picture",
      //     "permissions"
      //   ]
      // },
      cookie: {
        enabled: true,
        name: 'accelerate-jwt',
        httpOnly: isProd,
        secure: isProd
      }
    },
    mongodb:
      process.env.MONGODB_URL || 'mongodb://localhost:27017/accelerate-starter'
  };

  Object.keys(conf).forEach((name) => {
    app.set(name, conf[name]);
  });
};
