import * as React from 'react';

import {
  createStyles,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    description: {
      marginTop: theme.spacing(2)
    }
  });

const Error: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.container}>
    <Typography gutterBottom align="center" variant="h2">
      Oops.
    </Typography>
    <Typography gutterBottom align="center" variant="h4">
      Looks like we had an issue on our end.
    </Typography>
    <Typography className={classes.description} align="center" variant="h5">
      We'll address the problem immediately.
    </Typography>
    <Typography
      className={classes.description}
      gutterBottom
      align="center"
      variant="h5"
    >
      Please try again in a few seconds.
    </Typography>
  </div>
);

export default withStyles(styles)(Error);
