import * as React from 'react';
import { connect } from 'react-redux';

import classnames from 'classnames';
import initials from 'initials';

import {
  Avatar as MuiAvatar,
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';

import { IStore, IUserState } from '@reducers';

const styles = (theme: Theme) =>
  createStyles({
    avatar: {
      width: '100%',
      height: '100%'
    },
    letterAvatarLarge: {
      fontSize: '2em',
      backgroundColor: theme.palette.secondary.main
    }
  });

type IProps = IUserState &
  WithStyles<typeof styles> & {
    size?: 'large' | 'regular';
    className?: string;
  };

const Avatar: React.FC<IProps> = ({ classes, user, size, className }) => {
  const avatar = user && user.avatar;

  return avatar ? (
    <MuiAvatar
      className={classnames(className, classes.avatar)}
      alt="Avatar"
      src={avatar}
    />
  ) : (
    <MuiAvatar
      className={classnames(
        classes.avatar,
        className,
        size === 'large' && classes.letterAvatarLarge
      )}
      alt="Avatar"
    >
      {initials(user && user.name)}
    </MuiAvatar>
  );
};

export default connect((state: IStore): IUserState => state.user)(
  withStyles(styles)(Avatar)
);
