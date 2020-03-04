import * as mongoose from 'mongoose';
import { IUser } from './User.model';

export interface IMessage {
  user: IUser;
  message: string;
}

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String,
      index: true
    }
  },
  {
    timestamps: true
  }
);

const v1MessageModel = mongoose.model<IMessage & mongoose.Document>(
  'Message',
  messageSchema
);

export { v1MessageModel };
