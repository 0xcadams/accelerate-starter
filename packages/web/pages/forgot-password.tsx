import * as React from 'react';
import { connect } from 'react-redux';

import lodashGet from 'lodash.get';

import { NextSeo } from 'next-seo';

import * as emailValidator from 'email-validator';

import {
  Button,
  createStyles,
  Paper,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import * as UserActions from '@actions/UserActions';
import { IStore, IUserState } from '@reducers';

const mapDispatchToProps = {
  resetPassword: UserActions.resetPassword.request
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(20),
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      maxWidth: theme.breakpoints.values.md
    },
    paper: {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(3),
      maxWidth: theme.breakpoints.values.sm
    },
    submitButton: {
      marginTop: theme.spacing(2)
    }
  });

const ForgotPasswordPage: React.FC<typeof mapDispatchToProps &
  IUserState &
  WithStyles<typeof styles>> = ({
  classes,
  isFetching,
  resetPassword,
  error
}) => {
  const [email, setEmail] = React.useState({ value: '', error: '' });

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const newEmail = event.target.value;

    setEmail({
      ...email,
      value: newEmail
    });
  };

  const onSubmit = () => {
    const isEmailValid = emailValidator.validate(email.value);
    if (!isEmailValid) {
      setEmail({
        ...email,
        error: 'Email must be valid.'
      });
    } else {
      setEmail({
        ...email,
        error: ''
      });
      resetPassword(email.value);
    }
  };

  const requestError =
    lodashGet(error, 'response.status') === 500
      ? 'There was an error with your request. Please try again.'
      : null;

  return (
    <div className={classes.container}>
      <NextSeo noindex />

      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          Reset your password
        </Typography>
        <Typography gutterBottom>It happens to the best of us.</Typography>
        <TextField
          error={Boolean(email.error || requestError)}
          id="auth-modal-email"
          label="Email Address"
          type="email"
          autoComplete="username"
          value={email.value}
          onChange={onChangeEmail}
          variant="filled"
          helperText={email.error || requestError}
          fullWidth
          margin="normal"
          disabled={isFetching}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              onSubmit();
            }
          }}
        />

        <Button
          className={classes.submitButton}
          onClick={onSubmit}
          variant="contained"
          disabled={Boolean(isFetching || email.value.length === 0)}
        >
          Submit
        </Button>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(
  connect(
    (state: IStore): IUserState => state.user,
    mapDispatchToProps
  )(ForgotPasswordPage)
);
