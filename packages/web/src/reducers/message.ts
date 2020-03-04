import { ActionType, getType } from 'typesafe-actions';

import { IMessage } from '@accelerate-starter/core';
import * as actions from '@actions/MessageActions';
import { FeathersError } from '@feathersjs/errors';

/**
 * INITIAL_STATE
 */
export interface IMessageState {
  readonly error?: FeathersError;
  readonly isFetching: boolean;

  readonly messages: IMessage[];
}

export const initialMessageState: IMessageState = {
  error: undefined,
  isFetching: false,
  messages: []
};

/**
 * REDUCER
 */
export const MessageReducer = (
  state: IMessageState = initialMessageState,
  action: ActionType<typeof actions>
): IMessageState => {
  switch (action.type) {
    case getType(actions.createMessage.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.createMessage.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        messages: [...state.messages, action.payload]
      };
    case getType(actions.createMessage.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.getMessages.request):
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case getType(actions.getMessages.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        messages: action.payload
      };
    case getType(actions.getMessages.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};
