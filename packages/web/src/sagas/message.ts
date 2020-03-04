import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import * as MessageActions from '@actions/MessageActions';
import * as SnackbarActions from '@actions/SnackbarActions';
import * as api from '@api';

export function* createMessage(request) {
  try {
    const message = yield call(api.createMessage, request.payload);
    yield put(MessageActions.createMessage.success(message));
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(MessageActions.createMessage.failure(error));
  }
}

export function* getMessages() {
  try {
    const messages = yield call(api.getMessages);
    yield put(MessageActions.getMessages.success(messages));
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(MessageActions.getMessages.failure(error));
  }
}

/*
 * WATCHERS
 */

export function* watchCreateMessage() {
  yield takeEvery(MessageActions.createMessage.request, createMessage);
}

export function* watchGetMessages() {
  yield put(MessageActions.getMessages.request());
  yield takeLatest(MessageActions.getMessages.request, getMessages);
}

export default function* root() {
  yield all([fork(watchCreateMessage), fork(watchGetMessages)]);
}
