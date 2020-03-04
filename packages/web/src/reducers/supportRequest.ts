import { ActionType, getType } from 'typesafe-actions';

import { ISupportRequest } from '@accelerate-starter/core';
import * as actions from '@actions/SupportRequestActions';
import { FeathersError } from '@feathersjs/errors';

/**
 * INITIAL_STATE
 */
export interface ISupportRequestState {
  readonly error?: FeathersError;
  readonly isFetching: boolean;

  readonly supportRequest?: ISupportRequest;
}

export const initialSupportRequestState: ISupportRequestState = {
  error: undefined,
  isFetching: false,
  supportRequest: undefined
};

/**
 * REDUCER
 */
export const SupportRequestReducer = (
  state: ISupportRequestState = initialSupportRequestState,
  action: ActionType<typeof actions>
): ISupportRequestState => {
  switch (action.type) {
    case getType(actions.createSupportRequest.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.createSupportRequest.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        supportRequest: action.payload
      };
    case getType(actions.createSupportRequest.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};
