import * as AuthActions from '@Actions/AuthActions';
import * as api from '@Api';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import { IUser } from '@accelerate-starter/core';

export function* createUser(user: IUser) {
  try {
    const response = yield call(api.createUser, user);
    yield put(AuthActions.authenticateUser.success(response));
    yield call(toggleAuthModal, { showModal: false });
  } catch (error) {
    yield put(AuthActions.authenticateUser.failure(error));
  }
}

export function* authenticateUser(user?: IUser) {
  try {
    const response = yield call(api.authenticateUser, user);
    yield put(AuthActions.authenticateUser.success(response));
    yield call(toggleAuthModal, { showModal: false });
  } catch (error) {
    yield put(AuthActions.authenticateUser.failure(error));
  }
}

export function* logOutUser() {
  try {
    yield call(api.logOutUser);
    yield put(AuthActions.logOutUser.success());
  } catch (error) {
    yield put(AuthActions.logOutUser.failure(error));
  }
}

export function* toggleAuthModal(payload: AuthActions.IModal) {
  yield put(AuthActions.toggleAuthModal(payload));
}

/*
 * WATCHERS
 */

export function* watchCreateUser() {
  while (true) {
    const request = yield take(AuthActions.createUser.request);
    if (request) {
      yield call(createUser, request.payload);
    }
  }
}

export function* watchLogIn() {
  try {
    yield call(authenticateUser);
  } catch (e) {
    // empty catch block, since this is not a true error
  }

  while (true) {
    const tokenResponse = yield take(AuthActions.authenticateUser.request);
    if (tokenResponse) {
      yield call(authenticateUser, tokenResponse.payload);
    }
  }
}

export function* watchLogOut() {
  yield takeEvery(AuthActions.logOutUser.request, logOutUser);
}

export default function* root() {
  yield all([fork(watchCreateUser), fork(watchLogIn), fork(watchLogOut)]);
}
