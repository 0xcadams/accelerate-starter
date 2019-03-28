import { IMessage } from '@accelerate-starter/core';
import * as AuthActions from '@actions/AuthActions';
import * as MessageActions from '@actions/MessageActions';
import * as api from '@api';
import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

export function* getAllMessages() {
  try {
    const messages = yield call(api.getAllMessages);
    yield put(MessageActions.getMessages.success(messages));
  } catch (error) {
    yield put(MessageActions.getMessages.failure(error));
  }
}

export function* createMessage(message: IMessage) {
  try {
    const messageResponse = yield call(api.createMessage, message);
    yield put(MessageActions.createMessage.success(messageResponse));
  } catch (error) {
    yield put(MessageActions.createMessage.failure(error));
  }
}

/*
 * WATCHERS
 */

export function* watchGetAllMessages() {
  yield takeLatest(MessageActions.getMessages.request, getAllMessages);
}

export function* watchCreateMessage() {
  while (true) {
    const { payload } = yield take(MessageActions.createMessage.request);

    yield call(createMessage, payload);
  }
}

export function* watchAuthGetAllMessages() {
  while (true) {
    yield take([
      AuthActions.authenticateUser.success,
      AuthActions.logOutUser.success
    ]);
    yield put(MessageActions.getMessages.request());
  }
}

export default function* root() {
  yield all([
    fork(watchCreateMessage),
    fork(watchGetAllMessages),
    fork(watchAuthGetAllMessages)
  ]);
}
