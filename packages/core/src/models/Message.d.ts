import { IUser } from './User';

export interface IMessage {
  _id?: string;
  body: string;
  owner?: IUser;
}
