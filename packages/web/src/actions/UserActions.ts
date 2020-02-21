import { FeathersError } from '@feathersjs/errors';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { INewPasswordRequest, IUser } from '@accelerate-starter/core';

/*
 * TOGGLE AUTH MODAL
 */

export interface IModal {
  readonly showModal: 'signup' | 'login' | 'none';
}

export const toggleAuthModal = createAction('auth/TOGGLE_MODAL')<IModal>();

/*
 * TOGGLE DARK MODE
 */

export const toggleDarkMode = createAction('auth/TOGGLE_DARK_MODE')<boolean>();

/*
 * CREATE/UPDATE USER
 */

export const createUser = createAsyncAction(
  'user/CREATE_REQUEST',
  'user/CREATE_SUCCESS',
  'user/CREATE_FAILURE'
)<IUser, IUser, FeathersError>();

export const getUser = createAsyncAction(
  'user/GET_REQUEST',
  'user/GET_SUCCESS',
  'user/GET_FAILURE'
)<void, IUser, FeathersError>();

export const patchUser = createAsyncAction(
  'user/PATCH_REQUEST',
  'user/PATCH_SUCCESS',
  'user/PATCH_FAILURE'
)<Partial<IUser>, IUser, FeathersError>();

export const deleteUser = createAsyncAction(
  'user/DELETE_REQUEST',
  'user/DELETE_SUCCESS',
  'user/DELETE_FAILURE'
)<void, void, FeathersError>();

export const verifyUser = createAsyncAction(
  'user/VERIFY_REQUEST',
  'user/VERIFY_SUCCESS',
  'user/VERIFY_FAILURE'
)<String, void, FeathersError | Error>();

export const resetPassword = createAsyncAction(
  'user/RESET_PASSWORD_REQUEST',
  'user/RESET_PASSWORD_SUCCESS',
  'user/RESET_PASSWORD_FAILURE'
)<String, void, FeathersError | Error>();

export const newPassword = createAsyncAction(
  'user/NEW_PASSWORD_REQUEST',
  'user/NEW_PASSWORD_SUCCESS',
  'user/NEW_PASSWORD_FAILURE'
)<INewPasswordRequest, void, FeathersError | Error>();

/*
 * AUTHENTICATE USER
 */

export const authenticateUser = createAsyncAction(
  'auth/AUTHENTICATE_REQUEST',
  'auth/AUTHENTICATE_SUCCESS',
  'auth/AUTHENTICATE_FAILURE'
)<IUser | null, IUser, FeathersError>();

export const logOutUser = createAsyncAction(
  'auth/LOG_OUT_REQUEST',
  'auth/LOG_OUT_SUCCESS',
  'auth/LOG_OUT_FAILURE'
)<void, void, FeathersError>();
