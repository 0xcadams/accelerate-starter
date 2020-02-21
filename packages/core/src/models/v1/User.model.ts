import mongoose from 'mongoose';
import v4 from 'uuid/v4';

export interface ILocationTimestamped {
  lat: number;
  lon: number;
  date?: Date;
}

export interface IUser {
  _id?: string;
  avatar?: string;

  email: string;
  name?: string;
  password?: string;
  verifyKey?: string;
  verified?: boolean;
  isOnMarketingList?: boolean;

  resetKey?: string;
  resetKeyDate?: Date;

  ipList?: string[];
  userAgents?: string[];
}

const userSchema = new mongoose.Schema(
  {
    verified: { type: Boolean, default: false },
    verifyKey: { type: String, default: v4, index: true },

    resetKey: { type: String },
    resetKeyDate: { type: Date },

    avatar: { type: String },
    email: {
      type: String,
      index: true,
      unique: true,
      lowercase: true,
      required: true
    },
    name: { type: String, required: true },
    password: { type: String, required: true },

    isOnMarketingList: { type: Boolean, default: false },

    ipList: [{ type: String }],
    userAgents: [{ type: String }]
  },
  {
    timestamps: true
  }
);

const v1UserModel = mongoose.model<IUser & mongoose.Document>(
  'User',
  userSchema
);

export { v1UserModel };
