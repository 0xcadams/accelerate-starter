import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { AuthReducer } from './auth';
import { MessageReducer } from './message';

// Configure Redux store & reducers
export const rootReducer = combineReducers({
  auth: AuthReducer,
  message: MessageReducer
});

export * from './auth';
export * from './message';

export type IStore = StateType<typeof rootReducer>;
