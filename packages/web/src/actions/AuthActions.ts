import { FeathersError } from '@feathersjs/errors';
import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { IUser } from '@accelerate-starter/core';

/*
 * TOGGLE AUTH MODAL
 */

export interface IModal {
  readonly isSignUp?: boolean;
  readonly showModal: boolean;
}

export const toggleAuthModal = createStandardAction('auth/TOGGLE_MODAL')<
  IModal
>();

/*
 * CREATE USER
 */

export const createUser = createAsyncAction(
  'auth/CREATE_REQUEST',
  'auth/CREATE_SUCCESS',
  'auth/CREATE_FAILURE'
)<IUser, IUser, FeathersError>();

/*
 * AUTHENTICATE USER
 */

export const authenticateUser = createAsyncAction(
  'auth/AUTHENTICATE_REQUEST',
  'auth/AUTHENTICATE_SUCCESS',
  'auth/AUTHENTICATE_FAILURE'
)<IUser, IUser, FeathersError>();

export const logOutUser = createAsyncAction(
  'auth/LOG_OUT_REQUEST',
  'auth/LOG_OUT_SUCCESS',
  'auth/LOG_OUT_FAILURE'
)<void, void, FeathersError>();
