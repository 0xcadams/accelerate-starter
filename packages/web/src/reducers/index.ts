import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { SnackbarReducer } from './snackbar';
import { SupportRequestReducer } from './supportRequest';
import { UserReducer } from './user';

// Configure Redux store & reducers
export const rootReducer = combineReducers({
  user: UserReducer,
  snackbar: SnackbarReducer,
  supportRequest: SupportRequestReducer
});

export * from './user';
export * from './snackbar';
export * from './supportRequest';

export type IStore = StateType<typeof rootReducer>;
