import * as React from 'react';
import { connect } from 'react-redux';

import { NextSeo } from 'next-seo';

import { SingletonRouter, withRouter } from 'next/router';

import Loading from '@components/Loading';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

import * as SnackbarActions from '@actions/SnackbarActions';
import * as UserActions from '@actions/UserActions';
import { IStore, IUserState } from '@reducers';

const mapDispatchToProps = {
  verifyUser: UserActions.verifyUser.request,
  showSnackbar: SnackbarActions.showSnackbar
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.breakpoints.values.md
    },
    description: {
      marginTop: theme.spacing(2)
    }
  });

const VerifyPage: React.FC<typeof mapDispatchToProps &
  IUserState &
  WithStyles<typeof styles> & { router: SingletonRouter }> = ({
  verifyUser,
  user,
  classes,
  router,
  showSnackbar
}) => {
  React.useEffect(() => {
    if (router && router.query && router.query.key) {
      verifyUser(String(router.query.key));
    } else {
      showSnackbar(
        'There was an error verifying your account, please try again later.'
      );
      router.push('/');
    }
  }, [user]);

  return (
    <>
      <NextSeo noindex />
      <div className={classes.container}>
        <Loading />
      </div>
    </>
  );
};

export default withStyles(styles)(
  withRouter(
    connect(
      (state: IStore): IUserState => state.user,
      mapDispatchToProps
    )(VerifyPage)
  )
);
