import * as React from 'react';

import {
  createStyles,
  Fab,
  Theme,
  useMediaQuery,
  useTheme,
  WithStyles,
  withStyles,
  Zoom
} from '@material-ui/core';
import { ChatRounded } from '@material-ui/icons';

import classnames from 'classnames';

import Link from '@components/Link';

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),

      marginRight: theme.spacing(30),
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(7)
      }
    },
    fabIcon: {
      marginRight: theme.spacing(1)
    }
  });

interface IProps extends React.Props<{}> {}

const FeedbackFab: React.FC<IProps & WithStyles<typeof styles>> = ({
  classes
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Zoom
      in
      timeout={500}
      style={{
        transitionDelay: `500ms`
      }}
      unmountOnExit
    >
      <Link prefetch href="/feedback">
        <Fab
          variant="extended"
          aria-label={'Navigate'}
          className={classes.fab}
          color="primary"
        >
          <ChatRounded className={classnames(!isSmall && classes.fabIcon)} />
          {!isSmall && 'Feedback'}
        </Fab>
      </Link>
    </Zoom>
  );
};

export default withStyles(styles)(FeedbackFab);
