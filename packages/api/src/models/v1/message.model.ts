// message-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const createModel = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const message = new mongooseClient.Schema(
    {
      body: { type: String },
      owner: { type: mongooseClient.Schema.Types.ObjectId, ref: 'user' }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('message', message);
};

export { createModel };
