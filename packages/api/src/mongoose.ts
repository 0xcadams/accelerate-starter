import { default as mongoose } from 'mongoose';

import { Application } from './declarations';
import logger from './logger';

export default (app: Application) => {
  if (!process.env.MONGODB_URL) {
    throw new Error('Must define process.env.MONGODB_URL');
  }

  mongoose
    .connect(process.env.MONGODB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
