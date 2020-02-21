import * as React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

import * as UserActions from '@actions/UserActions';
import UserDataForm from '@components/AuthModal/UserDataForm';
import { IStore, IUserState } from '@reducers';

const mapDispatchToProps = {
  authenticateUser: UserActions.authenticateUser.request,
  createUser: UserActions.createUser.request,
  toggleAuthModal: UserActions.toggleAuthModal
};

const styles = () =>
  createStyles({
    dialogContentWrapper: {
      position: 'relative'
    },
    progress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    }
  });

export const AuthModal: React.FC<typeof mapDispatchToProps &
  WithStyles<typeof styles> &
  IUserState> = ({
  isModalShowing,
  toggleAuthModal,
  authenticateUser,
  createUser
}) => {
  const onClose = () => toggleAuthModal({ showModal: 'none' });

  return (
    <Dialog
      aria-labelledby="login-dialog"
      open={isModalShowing !== 'none'}
      onClose={onClose}
    >
      <DialogTitle id="form-dialog-title">
        {isModalShowing === 'signup' ? 'Sign up!' : 'Log In'}
      </DialogTitle>

      <UserDataForm
        onClose={onClose}
        onSubmit={(user) => {
          if (isModalShowing === 'signup') {
            createUser(user);
          } else {
            authenticateUser(user);
          }
        }}
      />
    </Dialog>
  );
};

const mapStateToProps = (state: IStore): IUserState => state.user;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AuthModal));
