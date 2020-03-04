import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import * as MessageActions from '@actions/MessageActions';
import * as SnackbarActions from '@actions/SnackbarActions';
import * as UserActions from '@actions/UserActions';
import * as api from '@api';
import { logEvent } from '@api/analytics';

import { INewPasswordRequest, IUser } from '@accelerate-starter/core';

export function* createUser(user: IUser) {
  try {
    yield call(api.createUser, user);
    yield call(authenticateUser, user);
    logEvent({ category: 'User', action: 'Created Account' });
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.createUser.failure(error));
  }
}

export function* patchUser(user: Partial<IUser>) {
  try {
    const response = yield call(api.patchUser, user);
    yield put(UserActions.patchUser.success(response));
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.patchUser.failure(error));
  }
}

export function* getUser() {
  try {
    const response = yield call(api.getUser);
    yield put(UserActions.getUser.success(response));
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.getUser.failure(error));
  }
}

export function* verifyUser(request) {
  try {
    const response = yield call(api.verifyUser, request.payload);
    yield call(api.pushHome);
    yield put(UserActions.verifyUser.success(response));
    yield put(SnackbarActions.showSnackbar('Your email has been verified!'));
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.verifyUser.failure(error));
  }
}

export function* authenticateUser(user?: IUser) {
  try {
    const response = yield call(api.authenticateUser, user);
    yield put(UserActions.authenticateUser.success(response));
    yield call(toggleAuthModal, { showModal: 'none' });

    yield put(MessageActions.getMessages.request());
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.authenticateUser.failure(error));
  }
}

export function* resetPassword(email: string) {
  try {
    const response = yield call(api.resetPassword, email);
    yield put(UserActions.resetPassword.success(response));
    yield put(
      SnackbarActions.showSnackbar('Password reset email has been sent.')
    );
    yield call(api.pushHome);
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.resetPassword.failure(error));
  }
}

export function* newPassword(request: INewPasswordRequest) {
  try {
    const response = yield call(api.newPassword, request);
    yield put(UserActions.newPassword.success(response));
    yield put(
      SnackbarActions.showSnackbar(
        'Your new password has been set. You can use it now to log in.'
      )
    );
    yield call(api.pushHome);
    yield toggleAuthModal({ showModal: 'login' });
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.newPassword.failure(error));
  }
}

export function* deleteUser() {
  try {
    const response = yield call(api.deleteUser);
    yield put(UserActions.deleteUser.success(response));
    yield put(SnackbarActions.showSnackbar('Account successfully deleted.'));
    yield call(api.pushHome);
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.deleteUser.failure(error));
  }
}

export function* logOutUser() {
  try {
    yield call(api.logOutUser);
    yield put(UserActions.logOutUser.success());
    yield call(api.pushHome);
  } catch (error) {
    yield put(SnackbarActions.showSnackbar(error));
    yield put(UserActions.logOutUser.failure(error));
  }
}

export function* toggleAuthModal(payload: UserActions.IModal) {
  yield put(UserActions.toggleAuthModal(payload));
}

/*
 * WATCHERS
 */

export function* watchToggleAuthModal() {
  while (true) {
    yield take(UserActions.toggleAuthModal);

    logEvent({ category: 'User', action: 'Toggled Authentication Modal' });
  }
}

export function* watchCreateUser() {
  while (true) {
    const request = yield take(UserActions.createUser.request);
    if (request) {
      yield call(createUser, request.payload);
    }
  }
}

export function* watchPatchUser() {
  while (true) {
    const request = yield take(UserActions.patchUser.request);

    if (request) {
      yield call(patchUser, request.payload);
    }
  }
}

export function* watchGetUser() {
  yield takeLatest(UserActions.getUser.request, getUser);
}

export function* watchDeleteUser() {
  yield takeLatest(UserActions.deleteUser.request, deleteUser);
}

export function* watchVerifyUser() {
  yield takeLatest(UserActions.verifyUser.request, verifyUser);
}

export function* watchResetPassword() {
  while (true) {
    const request = yield take(UserActions.resetPassword.request);

    if (request) {
      yield call(resetPassword, request.payload);
    }
  }
}

export function* watchNewPassword() {
  while (true) {
    const request = yield take(UserActions.newPassword.request);

    if (request) {
      yield call(newPassword, request.payload);
    }
  }
}

export function* watchLogIn() {
  try {
    yield put(UserActions.authenticateUser.request(null));
    yield call(authenticateUser);
  } catch (e) {
    // empty catch block, since this is not a true error
  }

  while (true) {
    const tokenResponse = yield take(UserActions.authenticateUser.request);
    if (tokenResponse) {
      yield call(authenticateUser, tokenResponse.payload);
    }
  }
}

export function* watchLogOut() {
  yield takeEvery(UserActions.logOutUser.request, logOutUser);
}

export default function* root() {
  yield all([
    fork(watchNewPassword),
    fork(watchCreateUser),
    fork(watchGetUser),
    fork(watchPatchUser),
    fork(watchDeleteUser),
    fork(watchVerifyUser),
    fork(watchToggleAuthModal),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchResetPassword)
  ]);
}
