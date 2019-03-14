import { default as mongoose } from 'mongoose';

const mongooseClient = (app) => {
  mongoose.connect(app.get('mongodb'), {
    useCreateIndex: true,
    useNewUrlParser: true
    // dbName: "accelerate"
  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};

export { mongooseClient };
