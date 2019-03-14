// user-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const createModel = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const user = new mongooseClient.Schema(
    {
      email: { type: String, unique: true, lowercase: true, required: true },
      facebookId: { type: String },
      googleId: { type: String },
      name: { type: String, required: true },
      password: { type: String, required: true }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('user', user);
};

export { createModel };
