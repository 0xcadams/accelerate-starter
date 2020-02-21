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
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: theme.breakpoints.values.md
    },
    description: {
      marginTop: theme.spacing(2)
    }
  });

const Unauthorized: React.FC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.container}>
    <Typography gutterBottom align="center" variant="h2">
      Uh oh.
    </Typography>
    <Typography gutterBottom align="center" variant="h4">
      Security told us you aren't allowed over here.
    </Typography>
    <Typography
      className={classes.description}
      gutterBottom
      align="center"
      variant="h5"
    >
      Please log in to view this page.
    </Typography>
  </div>
);

export default withStyles(styles)(Unauthorized);
