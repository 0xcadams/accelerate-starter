// message-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const createModel = (app) => {
  const mongooseClient = app.get('mongooseClient');
  const message = new mongooseClient.Schema(
    {
      owner: { type: mongooseClient.Schema.Types.ObjectId, ref: 'user' },
      body: { type: String }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('message', message);
};

export { createModel };
