import * as React from 'react';

import router from 'next/router';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { IUser } from '@accelerate-starter/core';
import Avatar from '@components/Avatar';

const styles = (theme: Theme) =>
  createStyles({
    accountCircle: {
      marginRight: theme.spacing(1)
    },
    avatar: {
      height: theme.spacing(5),
      width: theme.spacing(5)
    }
  });

type IProps = {
  user: IUser;
  logOutUser: () => {};
};

const AuthMenu: React.FC<IProps & WithStyles<typeof styles>> = ({
  user,
  logOutUser,
  classes
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const onClose = () => setAnchorEl(null);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  return (
    <>
      <IconButton id="user-avatar-btn" onClick={onClick}>
        <Avatar className={classes.avatar} />
      </IconButton>
      <Menu open={Boolean(anchorEl)} onClose={onClose} anchorEl={anchorEl}>
        <MenuItem disabled>
          <AccountCircle className={classes.accountCircle} />
          {user && user.email}
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={() => {
            onClose();
            router.push('/profile');
          }}
        >
          Your Profile
        </MenuItem>

        <MenuItem
          id="sign-out-btn"
          onClick={() => {
            onClose();
            logOutUser();
          }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default withStyles(styles)(AuthMenu);
