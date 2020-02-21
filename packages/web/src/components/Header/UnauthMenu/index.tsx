import * as React from 'react';

import { IconButton, Menu, MenuItem } from '@material-ui/core';

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core/styles';

import { MenuRounded } from '@material-ui/icons';

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      height: theme.spacing(5),
      width: theme.spacing(5)
    }
  });

type IProps = {
  isFetching: boolean;
  signUp: () => {};
  logIn: () => {};
};

const AuthorizedMenu: React.FC<IProps & WithStyles<typeof styles>> = ({
  signUp,
  logIn
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const onClose = () => {
    setAnchorEl(null);
    return true;
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  return (
    <>
      <IconButton color={'inherit'} onClick={onClick}>
        <MenuRounded color="inherit" />
      </IconButton>
      <Menu open={Boolean(anchorEl)} onClose={onClose} anchorEl={anchorEl}>
        <MenuItem onClick={() => onClose() && logIn()}>Log In</MenuItem>
        <MenuItem onClick={() => onClose() && signUp()}>Sign Up</MenuItem>
      </Menu>
    </>
  );
};

export default withStyles(styles)(AuthorizedMenu);
