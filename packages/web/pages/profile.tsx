import * as React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Theme,
  Tooltip,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import Avatar from '@components/Avatar';

import * as UserActions from '@actions/UserActions';
import { ErrorRounded, VerifiedUserRounded } from '@material-ui/icons';
import { IStore, IUserState } from '@reducers';

interface IStoreState {
  user: IUserState;
}

const mapDispatchToProps = {
  getUser: UserActions.getUser.request,
  deleteUser: UserActions.deleteUser.request
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    grid: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: theme.spacing(4),
      maxWidth: theme.breakpoints.values.sm
    },
    profile: {
      textAlign: 'center'
    },
    avatar: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: theme.spacing(12),
      height: theme.spacing(12)
    },
    email: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    emailIcon: {
      marginLeft: theme.spacing(1)
    },
    name: {
      marginTop: theme.spacing(1)
    },
    listPaper: {
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        marginTop: 0
      }
    },
    billingPaper: {
      padding: theme.spacing(2)
    },
    list: {
      margin: theme.spacing(1),
      maxHeight: theme.spacing(39),
      overflow: 'auto'
    },
    pricingButton: {
      paddingTop: theme.spacing(2),
      textAlign: 'right'
    },
    deleteButton: {
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: 'right'
    },
    progress: {
      textAlign: 'center',
      width: '100%'
    }
  });

type IProps = IStoreState &
  typeof mapDispatchToProps &
  WithStyles<typeof styles>;

const ProfilePage: React.FC<IProps> = ({
  classes,
  user: { user, isFetching },
  getUser,
  deleteUser
}) => {
  const [deleteAccount, setDeleteAccount] = React.useState(false);

  React.useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return (
      <Typography gutterBottom variant="h3">
        You must log in to view this page.
      </Typography>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <Grid justify="center" className={classes.grid} container spacing={2}>
          <Grid className={classes.profile} item xs={12}>
            <Avatar className={classes.avatar} size="large" />
            <Typography className={classes.name} variant="h3">
              {user.name}
            </Typography>
            <div className={classes.email}>
              <Typography variant="h6">{user.email}</Typography>
              <Tooltip
                placement="right"
                title={
                  user.verified
                    ? 'Account is verified.'
                    : 'Email is not verified.'
                }
              >
                {user.verified ? (
                  <VerifiedUserRounded className={classes.emailIcon} />
                ) : (
                  <ErrorRounded className={classes.emailIcon} />
                )}
              </Tooltip>
            </div>
          </Grid>

          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              Account
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.listPaper}>
              <List
                subheader={<ListSubheader>Delete Account</ListSubheader>}
                className={classes.list}
              >
                {
                  <ListItem alignItems="flex-start">
                    <FormControlLabel
                      id="delete-account-chkbx"
                      control={
                        <Checkbox
                          checked={deleteAccount}
                          onChange={() =>
                            setDeleteAccount((deleteAccount) => !deleteAccount)
                          }
                          value="checkedDeleteAccount"
                        />
                      }
                      label={`Confirm that I want to start the account deletion process for ${user.email}.`}
                    />
                  </ListItem>
                }
              </List>

              <div className={classes.deleteButton}>
                <Button
                  color="secondary"
                  disabled={!deleteAccount || isFetching}
                  variant="contained"
                  onClick={() => {
                    deleteUser();
                  }}
                >
                  Delete
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default connect(
  (state: IStore): IStoreState => ({
    user: state.user
  }),
  mapDispatchToProps
)(withStyles(styles)(ProfilePage));
