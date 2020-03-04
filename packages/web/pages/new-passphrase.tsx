import * as React from 'react';
import { connect } from 'react-redux';

import lodashGet from 'lodash.get';

import { NextSeo } from 'next-seo';
import { useRouter, withRouter } from 'next/router';

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
import { PASSWORD_LENGTH_MINIMUM } from '@components/AuthModal/UserDataForm';
import { IStore, IUserState } from '@reducers';

const mapDispatchToProps = {
  newPassword: UserActions.newPassword.request
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

const NewPassphrasePage: React.FC<typeof mapDispatchToProps &
  IUserState &
  WithStyles<typeof styles>> = ({
  classes,
  isFetching,
  newPassword,
  error
}) => {
  const { query } = useRouter();

  const [password, setPassword] = React.useState({ value: '', error: '' });

  const onChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    setPassword({
      ...password,
      value: event.target.value
    });
  };

  const onSubmit = () => {
    if (password.value.length < PASSWORD_LENGTH_MINIMUM) {
      setPassword({
        ...password,
        error: `Password must be at least ${PASSWORD_LENGTH_MINIMUM} characters.`
      });
    } else if (query && query.key) {
      newPassword({
        password: password.value,
        resetKey: String(query.key)
      });
    }
  };

  const requestError =
    lodashGet(error, 'response.status') === 401
      ? lodashGet(error, 'response.data.message')
      : null;

  return (
    <div className={classes.container}>
      <NextSeo noindex />

      <Paper className={classes.paper}>
        <Typography gutterBottom variant="h5">
          Set password
        </Typography>
        <TextField
          error={Boolean(password.error || requestError)}
          id="auth-modal-password"
          label="Your new password"
          type="password"
          autoComplete="new-password"
          value={password.value}
          onChange={onChangePassword}
          helperText={password.error || requestError}
          fullWidth
          margin="normal"
          variant="filled"
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
          disabled={Boolean(
            isFetching || password.value.length < PASSWORD_LENGTH_MINIMUM
          )}
        >
          Set password
        </Button>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(
  withRouter(
    connect(
      (state: IStore): IUserState => state.user,
      mapDispatchToProps
    )(NewPassphrasePage)
  )
);
