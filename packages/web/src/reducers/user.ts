import { ActionType, getType } from 'typesafe-actions';

import { IUser } from '@accelerate-starter/core';
import * as actions from '@actions/UserActions';
import { FeathersError } from '@feathersjs/errors';
import { AxiosError } from 'axios';

/**
 * INITIAL_STATE
 */
export interface IUserState {
  readonly error?: FeathersError | AxiosError | Error;
  readonly isFetching: boolean;
  readonly isModalShowing: 'signup' | 'login' | 'none';
  readonly isDarkMode: boolean;

  readonly user?: IUser;
}

export const initialUserState: IUserState = {
  error: undefined,
  isFetching: false,
  isModalShowing: 'none',
  isDarkMode: true,
  user: undefined
};

/**
 * REDUCER
 */
export const UserReducer = (
  state: IUserState = initialUserState,
  action: ActionType<typeof actions>
): IUserState => {
  switch (action.type) {
    case getType(actions.toggleAuthModal):
      return {
        ...state,
        error: action.payload.showModal ? undefined : state.error, // clear errors when the auth modal is being shown
        isModalShowing: action.payload.showModal
      };

    case getType(actions.toggleDarkMode):
      return {
        ...state,
        isDarkMode: action.payload
      };

    case getType(actions.createUser.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.createUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        user: action.payload
      };
    case getType(actions.createUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.patchUser.request):
      return {
        ...state,
        error: undefined
      };
    case getType(actions.patchUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        user: action.payload
      };
    case getType(actions.patchUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.authenticateUser.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.authenticateUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        user: action.payload
      };
    case getType(actions.authenticateUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.getUser.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.getUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case getType(actions.getUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.logOutUser.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.logOutUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        user: undefined
      };
    case getType(actions.logOutUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.verifyUser.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.verifyUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false
      };
    case getType(actions.verifyUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.resetPassword.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.resetPassword.success):
      return {
        ...state,
        error: undefined,
        isFetching: false
      };
    case getType(actions.resetPassword.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.newPassword.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.newPassword.success):
      return {
        ...state,
        error: undefined,
        isFetching: false
      };
    case getType(actions.newPassword.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.deleteUser.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.deleteUser.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        user: undefined
      };
    case getType(actions.deleteUser.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};
