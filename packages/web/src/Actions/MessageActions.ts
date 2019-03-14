import { Paginated } from '@feathersjs/feathers';
import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { IMessage } from '@Models/Message';

/*
 * GET
 */

type GetMessagesResponse = IMessage | IMessage[] | Paginated<IMessage>;

export const getMessages = createAsyncAction(
  'message/GET_REQUEST',
  'message/GET_SUCCESS',
  'message/GET_FAILURE'
)<IMessage, GetMessagesResponse, Error>();

/*
 * CREATE
 */

export const createMessage = createAsyncAction(
  'message/CREATE_REQUEST',
  'message/CREATE_SUCCESS',
  'message/CREATE_FAILURE'
)<IMessage, IMessage, Error>();

export const createMessageIncoming = createStandardAction(
  'message/CREATE_INCOMING'
)<IMessage>();
