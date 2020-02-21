import * as React from 'react';

import {
  CircularProgress,
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center'
    },
    muiContainer: {
      textAlign: 'center',
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  });

const Loading: React.FC<WithStyles<typeof styles> & { small?: boolean }> = ({
  classes,
  small
}) => {
  if (small) {
    return (
      <div id="loading-spinner" className={classes.muiContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div id="loading-spinner" className={classes.container}>
      <CircularProgress />
    </div>
  );
};

export default withStyles(styles)(Loading);
