import { all, call, fork, put, take } from 'redux-saga/effects';

import * as SnackbarActions from '@actions/SnackbarActions';
import * as SupportRequestActions from '@actions/SupportRequestActions';
import * as api from '@api';

import { ISupportRequest } from '@accelerate-starter/core';

export function* createSupportRequest(request: ISupportRequest) {
  try {
    const supportRequest = yield call(api.createSupportRequest, request);
    yield put(
      SupportRequestActions.createSupportRequest.success(supportRequest)
    );
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(SupportRequestActions.createSupportRequest.failure(error));
  }
}

/*
 * WATCHERS
 */

export function* watchCreateSupportRequest() {
  while (true) {
    const request = yield take(
      SupportRequestActions.createSupportRequest.request
    );
    if (request) {
      yield call(createSupportRequest, request.payload);
    }
  }
}

export default function* root() {
  yield all([fork(watchCreateSupportRequest)]);
}
