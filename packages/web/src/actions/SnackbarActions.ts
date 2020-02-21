import { FeathersError } from '@feathersjs/errors';
import { createAction } from 'typesafe-actions';

/*
 * SNACKBAR
 */

export const showSnackbar = createAction('snackbar/SHOW')<
  string | FeathersError | Error
>();

export const hideSnackbar = createAction('snackbar/HIDE')<void>();
