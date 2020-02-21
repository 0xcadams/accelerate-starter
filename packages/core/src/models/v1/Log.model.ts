import * as mongoose from 'mongoose';

export interface ILog {
  message: string;
  source: 'web' | 'api';
}

const logSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      index: true
    },
    source: {
      type: String,
      index: true
    }
  },
  {
    timestamps: true
  }
);

const v1LogModel = mongoose.model<ILog & mongoose.Document>('Log', logSchema);

export { v1LogModel };
