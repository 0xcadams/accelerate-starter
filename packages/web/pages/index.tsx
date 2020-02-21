import * as React from 'react';
import { connect } from 'react-redux';

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

import * as UserActions from '@actions/UserActions';

import Loading from '@components/Loading';

import { IStore, IUserState } from '@reducers';

const styles = (theme: Theme) =>
  createStyles({
    landingContainer: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(20),
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      maxWidth: theme.breakpoints.values.md
    }
  });

const mapDispatchToProps = {
  toggleAuthModal: UserActions.toggleAuthModal
};

type IProps = WithStyles<typeof styles> &
  IUserState &
  typeof mapDispatchToProps & { pageContext: { isMobile: boolean } };

const HomePage: React.FC<IProps> = ({ classes, isFetching }) => {
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <div className={classes.landingContainer}>Hello!</div>
      )}
    </>
  );
};

export default withStyles(styles)(
  connect(
    (state: IStore): IUserState => state.user,
    mapDispatchToProps
  )(HomePage)
);
