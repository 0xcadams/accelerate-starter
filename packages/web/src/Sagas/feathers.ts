import { IMessage } from '@accelerate-starter/core';
import { createMessageIncoming } from '@Actions/MessageActions';
import { messageService } from '@Api';
import { Service } from '@feathersjs/feathers';
import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take } from 'redux-saga/effects';

const createSocketChannel = <T>(service: Service<T>) => {
  return eventChannel((emit) => {
    const pingHandler = emit;

    service.on('created', pingHandler);

    return () => {
      service.removeListener('created', pingHandler);
    };
  });
};

/*
 * WATCHERS
 */

export function* watchGetMessages() {
  const socketChannel = yield call(createSocketChannel, messageService);

  while (true) {
    try {
      const payload: IMessage = yield take(socketChannel);
      yield put(createMessageIncoming(payload));
    } catch (err) {
      // TODO handle this error appropriately
    }
  }
}

export default function* root() {
  yield all([fork(watchGetMessages)]);
}
