import { Paginated } from '@feathersjs/feathers';
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
  readonly lastUpdated: number;
  readonly messages: IMessage[];
}

const initialMessages: IMessage[] = [];

const INITIAL_STATE: IMessageState = {
  error: undefined,
  isFetching: false,
  lastUpdated: 0,
  messages: initialMessages
};

/**
 * REDUCER
 */
const getMessages = (
  messages: IMessage | IMessage[] | Paginated<IMessage>
): IMessage[] => {
  if ((messages as Paginated<IMessage>).data !== undefined) {
    return (messages as Paginated<IMessage>).data;
  }  if ((messages as IMessage[]) !== undefined) {
    return messages as IMessage[];
  }  if ((messages as IMessage) !== undefined) {
    return [messages as IMessage];
  }

  return initialMessages;
};

const addNewMessage = (state: IMessageState, message: IMessage) =>
  state.messages.some((msg) => msg._id === message._id)
    ? state.messages
    : [...(state && state.messages), message];

export const MessageReducer = (
  state: IMessageState = INITIAL_STATE,
  action: ActionType<typeof actions>
) => {
  switch (action.type) {
    case getType(actions.getMessages.request):
      return {
        ...state,
        error: undefined,
        isFetching: true,
        messages: initialMessages
      };
    case getType(actions.getMessages.success):
      return {
        ...state,
        error: undefined,
        isFetching: false,
        lastUpdated: Date.now(),
        messages: action.payload && getMessages(action.payload)
      };
    case getType(actions.getMessages.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

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
        lastUpdated: Date.now(),
        messages: addNewMessage(state, action.payload)
      };
    case getType(actions.createMessage.failure):
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case getType(actions.createMessageIncoming):
      return {
        ...state,
        lastUpdated: Date.now(),
        messages: addNewMessage(state, action.payload)
      };

    default:
      return state;
  }
};
