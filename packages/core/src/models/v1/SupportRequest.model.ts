import * as mongoose from 'mongoose';
import { IUser } from './User.model';

export interface ISupportRequest {
  issue: string;
  type: 'support' | 'feedback';
  user?: IUser | string;
}

const supportRequestSchema = new mongoose.Schema(
  {
    issue: {
      type: String,
      index: true
    },
    type: {
      type: String,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const v1SupportRequestModel = mongoose.model<
  ISupportRequest & mongoose.Document
>('SupportRequest', supportRequestSchema);

export { v1SupportRequestModel };
