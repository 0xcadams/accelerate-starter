import * as mongoose from 'mongoose';
import { IUser } from './User.model';

export interface IReduxHistoryException {
  message: string;
  stack: string;
  type: string;
}

export interface IReduxHistory {
  exception: IReduxHistoryException;
  payload: string;
  preloadedState: string;
  userAgent: string;
  user?: IUser | string;
}

const reduxHistoryExceptionSchema = new mongoose.Schema({
  message: {
    type: String,
    index: true
  },
  stack: {
    type: String
  },
  type: {
    type: String,
    index: true
  }
});

const reduxHistorySchema = new mongoose.Schema(
  {
    exception: reduxHistoryExceptionSchema,
    payload: {
      type: String
    },
    preloadedState: {
      type: String
    },
    userAgent: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    }
  },
  {
    timestamps: true
  }
);

const v1ReduxHistoryModel = mongoose.model<IReduxHistory & mongoose.Document>(
  'ReduxHistory',
  reduxHistorySchema
);

export { v1ReduxHistoryModel };
