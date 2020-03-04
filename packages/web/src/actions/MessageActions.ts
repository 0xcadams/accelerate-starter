import { FeathersError } from '@feathersjs/errors';
import { createAsyncAction } from 'typesafe-actions';

import { IMessage } from '@accelerate-starter/core';

/*
 * CREATE/GET MESSAGES
 */

export const createMessage = createAsyncAction(
  'message/CREATE_REQUEST',
  'message/CREATE_SUCCESS',
  'message/CREATE_FAILURE'
)<IMessage, IMessage, FeathersError>();

export const getMessages = createAsyncAction(
  'message/GET_REQUEST',
  'message/GET_SUCCESS',
  'message/GET_FAILURE'
)<void, IMessage[], FeathersError>();
