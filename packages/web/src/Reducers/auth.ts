import { ActionType, getType, StateType } from 'typesafe-actions';

import * as actions from '@Actions/AuthActions';
import { IUser } from '@Models/User';
import { FeathersError } from '@feathersjs/errors';

/**
 * INITIAL_STATE
 */
interface IState {
  readonly error?: FeathersError;
  readonly isFetching: boolean;
  readonly isModalShowing: boolean;
  readonly isSignUp: boolean;

  readonly user?: IUser;
}

const INITIAL_STATE: IState = {
  error: undefined,
  isFetching: false,
  isModalShowing: false,
  isSignUp: true,
  user: undefined
};

/**
 * REDUCER
 */
export const AuthReducer = (
  state: IState = INITIAL_STATE,
  action: ActionType<typeof actions>
) => {
  switch (action.type) {
    case getType(actions.toggleAuthModal):
      return {
        ...state,
        error: action.payload.showModal ? undefined : state.error, // clear errors when the auth modal is being shown
        isModalShowing: action.payload.showModal,
        isSignUp:
          action.payload.isSignUp !== undefined
            ? action.payload.isSignUp
            : state.isSignUp
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
        error: undefined,
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

    default:
      return state;
  }
};

export type IAuthModalState = StateType<typeof AuthReducer>;
