import * as MessageActions from '@Actions/MessageActions';
import * as api from '@Api';
import { IMessage } from '@Models/Message';
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

export default function* root() {
  yield all([fork(watchCreateMessage), fork(watchGetAllMessages)]);
}
