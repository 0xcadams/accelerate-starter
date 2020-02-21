import { all, fork } from 'redux-saga/effects';

import supportRequest from './supportRequest';
import user from './user';

export function* rootSaga() {
  yield all([fork(user), fork(supportRequest)]);
}
