import { ActionType, getType } from 'typesafe-actions';

import * as actions from '@actions/SnackbarActions';
import { FeathersError } from '@feathersjs/errors';

/**
 * INITIAL_STATE
 */
export interface ISnackbarState {
  readonly lastUpdated: number;
  readonly message?: string;
}

export const initialSnackbarState: ISnackbarState = {
  lastUpdated: 0,
  message: undefined
};

const getMessage = (message: string | FeathersError | Error) => {
  if (typeof message === 'string') {
    return message;
  }

  if (message instanceof FeathersError) {
    if (message.code === 502) {
      return 'Error - please try again in a few seconds.';
    }

    return undefined;
  }

  if (message instanceof Error) {
    // if (message.code && message.code === 'ECONNABORTED') {
    //   return 'Error - please try again in a few seconds.';
    // } TODO fix this to use the correct error class

    return undefined;
  }

  return message;
};

/**
 * REDUCER
 */
export const SnackbarReducer = (
  state: ISnackbarState = initialSnackbarState,
  action: ActionType<typeof actions>
): ISnackbarState => {
  switch (action.type) {
    case getType(actions.showSnackbar):
      return {
        ...state,
        lastUpdated: Date.now(),
        message: getMessage(action.payload)
      };

    case getType(actions.hideSnackbar):
      return {
        ...state,
        lastUpdated: Date.now(),
        message: undefined
      };

    default:
      return state;
  }
};
