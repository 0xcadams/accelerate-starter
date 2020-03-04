import * as React from 'react';
import { connect } from 'react-redux';

import * as emailValidator from 'email-validator';

import {
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  DialogContent,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';

import {
  AccountCircleRounded,
  EmailRounded,
  LockRounded
} from '@material-ui/icons';

import { IUser } from '@accelerate-starter/core';

import * as UserActions from '@actions/UserActions';
import { FeathersError } from '@feathersjs/errors';
import { IStore, IUserState } from '@reducers';

export const PASSWORD_LENGTH_MINIMUM = 6;

const mapDispatchToProps = {
  createUser: UserActions.createUser.request,
  authenticateUser: UserActions.authenticateUser.request
};

const styles = (theme: Theme) =>
  createStyles({
    dialogContentWrapper: {
      position: 'relative' as 'relative'
    },
    progress: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    },
    resetPassword: {
      marginLeft: theme.spacing(1)
    }
  });

export interface IOnSubmit {
  onSubmit(user: IUser): void;
  onClose(): void;
}

export const UserDataForm: React.FC<typeof mapDispatchToProps &
  WithStyles<typeof styles> &
  IUserState &
  IOnSubmit> = ({
  isModalShowing,
  onClose,
  onSubmit,
  isFetching,
  error,
  classes
}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState({ value: '', error: '' });
  const [password, setPassword] = React.useState({ value: '', error: '' });
  const [toc, setToc] = React.useState(false);
  const [marketing, setMarketing] = React.useState(true);

  const defaultErrorText = 'Error with login, please try again.';

  let requestError: string | undefined = undefined;

  if (error) {
    if ((error as FeathersError).code) {
      requestError =
        (error as FeathersError).code === 409
          ? 'Email already exists.'
          : (error as FeathersError).code === 401
          ? 'Incorrect login.'
          : defaultErrorText;
    }
  }

  // only show error text after a user is authenticated
  const displayError = !name && !password.value && !email.value && requestError;

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const newEmail = event.target.value;
    const isEmailValid = emailValidator.validate(newEmail);

    setEmail({
      error: !isEmailValid ? 'Email must be valid.' : '',
      value: newEmail
    });
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setName(event.target.value);
  };

  const onChangeToc = (): void => {
    setToc(!toc);
  };

  const onChangeMarketing = (): void => {
    setMarketing(!marketing);
  };

  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const newPassword = event.target.value;

    setPassword({
      error:
        newPassword.length < PASSWORD_LENGTH_MINIMUM
          ? `Password must be at least ${PASSWORD_LENGTH_MINIMUM} characters.`
          : '',
      value: newPassword
    });
  };

  const onFormSubmit = (): void => {
    if (!password.error && !email.error) {
      onSubmit({
        name: name.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        isOnMarketingList: marketing
      });

      setName('');
      setEmail({ value: '', error: '' });
      setPassword({ value: '', error: '' });
      setToc(false);
      setMarketing(true);
    }
  };

  const isFormValid =
    email.value &&
    !email.error &&
    password.value &&
    !password.error &&
    (isModalShowing === 'signup' ? toc && name : true);

  return (
    <>
      <DialogContent>
        {isFetching && <CircularProgress className={classes.progress} />}

        {isModalShowing === 'signup' && (
          <TextField
            id="auth-modal-name"
            label="Full Name"
            value={name}
            onChange={onChangeName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleRounded />
                </InputAdornment>
              )
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled={isFetching}
          />
        )}
        <TextField
          error={Boolean(email.error)}
          id="auth-modal-email"
          label="Email Address"
          type="email"
          autoComplete="username"
          value={email.value}
          onChange={onChangeEmail}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailRounded />
              </InputAdornment>
            )
          }}
          helperText={email.error}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={isFetching}
        />
        <TextField
          error={Boolean(password.error)}
          id="auth-modal-password"
          label="Password"
          type="password"
          autoComplete={
            isModalShowing === 'signup' ? 'new-password' : 'current-password'
          }
          value={password.value}
          onChange={onChangePassword}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRounded />
              </InputAdornment>
            )
          }}
          helperText={password.error}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={isFetching}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              onFormSubmit();
            }
          }}
        />

        {isModalShowing === 'signup' ? (
          <>
            <FormControlLabel
              id="auth-modal-toc-chkbx"
              control={
                <Checkbox
                  checked={toc}
                  onChange={onChangeToc}
                  value="checkedToc"
                />
              }
              label={
                <span>
                  {'I agree to the '}
                  <a href={'/terms'}>Terms</a>
                  {' and '}
                  <a href={'/privacy'}>Privacy Policy</a>.
                </span>
              }
              disabled={isFetching}
            />
            <FormControlLabel
              id="auth-modal-marketing-chkbx"
              control={
                <Checkbox
                  checked={marketing}
                  onChange={onChangeMarketing}
                  value="checkedMarketing"
                />
              }
              label="I agree to be contacted about improving the site."
              disabled={isFetching}
            />
          </>
        ) : (
          <span className={classes.resetPassword}>
            <a href={'/forgot-password'}>{'Reset password'}</a>
          </span>
        )}

        {displayError && <Typography color="error">{displayError}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button id="auth-modal-cancel-btn" onClick={onClose} size="large">
          Cancel
        </Button>
        <Button
          id="auth-modal-ok-btn"
          onClick={onFormSubmit}
          size="large"
          variant="contained"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
};

const mapStateToProps = (state: IStore): IUserState => state.user;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserDataForm));
