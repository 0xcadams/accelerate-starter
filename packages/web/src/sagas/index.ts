import { all, fork } from 'redux-saga/effects';

import auth from './auth';
import feathers from './feathers';
import message from './message';

export function* rootSaga() {
  yield all([fork(auth), fork(feathers), fork(message)]);
}
