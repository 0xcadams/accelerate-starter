import { AuthenticationClient } from '@feathersjs/authentication-client';
import { Service } from '@feathersjs/feathers';
import { IReduxHistory, ISupportRequest, IUser } from '../models';

export interface ServicePaths {
  authentication: AuthenticationClient;
  'v1/redux-history': Service<IReduxHistory>;
  'v1/support-request': Service<ISupportRequest>;
  'v1/user': Service<IUser>;
}

export interface INewPasswordRequest {
  password: string;
  resetKey: string;
}

export interface IPasswordResetRequest {
  email: string;
}
