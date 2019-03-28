import { FeathersError } from '@feathersjs/errors';
import { Paginated } from '@feathersjs/feathers';
import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { IMessage } from '@accelerate-starter/core';

/*
 * GET
 */

type GetMessagesResponse = IMessage | IMessage[] | Paginated<IMessage>;

export const getMessages = createAsyncAction(
  'message/GET_REQUEST',
  'message/GET_SUCCESS',
  'message/GET_FAILURE'
)<void, GetMessagesResponse, FeathersError>();

/*
 * CREATE
 */

export const createMessage = createAsyncAction(
  'message/CREATE_REQUEST',
  'message/CREATE_SUCCESS',
  'message/CREATE_FAILURE'
)<IMessage, IMessage, FeathersError>();

export const createMessageIncoming = createStandardAction(
  'message/CREATE_INCOMING'
)<IMessage>();
