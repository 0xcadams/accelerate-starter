import * as React from 'react';
import { connect } from 'react-redux';

import { SingletonRouter, withRouter } from 'next/router';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import * as UserActions from '@actions/UserActions';
import logoSvg from '@assets/logo.svg';
import Link from '@components/Link';
import { IStore, IUserState } from '@reducers';

import AuthMenu from './AuthMenu';
import UnauthMenu from './UnauthMenu';

const styles = (theme: Theme) =>
  createStyles({
    appBarSpacer: theme.mixins.toolbar,
    toolBar: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.breakpoints.values.lg
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    loginButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginRight: 0
      }
    },
    navigationContainer: {
      marginRight: theme.spacing(10),
      [theme.breakpoints.between('xs', 'sm')]: {
        marginRight: theme.spacing(2)
      },
      [theme.breakpoints.down('xs')]: {
        marginRight: 0
      }
    },
    logoContainer: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    },
    logoImage: {
      height: 35,
      marginRight: theme.spacing(1)
    },
    progress: {
      marginRight: theme.spacing(2)
    },
    authButtons: {
      marginLeft: 'auto',
      textAlign: 'right'
    },
    headerButton: {
      marginLeft: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1)
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0
      }
    },
    toolbar: theme.mixins.toolbar
  });

const mapDispatchToProps = {
  authenticateUser: UserActions.authenticateUser.request,
  createUser: UserActions.createUser.request,
  logOutUser: UserActions.logOutUser.request,
  toggleAuthModal: UserActions.toggleAuthModal
};

type IProps = IUserState &
  WithStyles<typeof styles> &
  typeof mapDispatchToProps & {
    router: SingletonRouter;
    isMobile: boolean;
  };

const tabs = [
  {
    title: 'Contact',
    href: '/contact'
  }
];

const authTabs = [
  {
    title: 'Contact',
    href: '/contact'
  }
];

const Header: React.FC<IProps> = ({
  user,
  isFetching,
  logOutUser,
  toggleAuthModal,
  classes,
  isMobile
}) => {
  const logIn = () =>
    toggleAuthModal({
      showModal: 'login'
    });

  const signUp = () =>
    toggleAuthModal({
      showModal: 'signup'
    });

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar color="inherit" className={classes.toolBar}>
          <Link href="/">
            <div className={classes.logoContainer}>
              <img
                alt="Accelerate Starter Logo"
                className={classes.logoImage}
                src={logoSvg}
              />
              {!isMobile && (
                <Typography variant="h5" color="inherit">
                  Accelerate
                </Typography>
              )}
            </div>
          </Link>

          <div className={classes.authButtons}>
            <span className={classes.navigationContainer}>
              {!isFetching &&
                (user ? authTabs : tabs).map((e) => (
                  <Link key={e.title} href={e.href}>
                    <Button
                      aria-label={e.title}
                      className={classes.headerButton}
                      color="inherit"
                    >
                      {e.title}
                    </Button>
                  </Link>
                ))}
            </span>

            {isFetching ? (
              <CircularProgress className={classes.progress} color="inherit" />
            ) : user ? (
              <AuthMenu user={user} logOutUser={() => logOutUser()} />
            ) : isMobile ? (
              <UnauthMenu
                logIn={logIn}
                signUp={signUp}
                isFetching={isFetching}
              />
            ) : (
              <>
                <Button
                  id="login-btn"
                  aria-label="Login Button"
                  className={classes.loginButton}
                  onClick={logIn}
                  color="inherit"
                >
                  Login
                </Button>
                <Button
                  id="sign-up-btn"
                  aria-label="Sign Up Button"
                  variant={'contained'}
                  color={'secondary'}
                  onClick={signUp}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </>
  );
};

export default connect(
  (state: IStore): IUserState => state.user,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Header)));
