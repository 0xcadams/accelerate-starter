import * as React from 'react';

import { NextPage } from 'next';

import {
  createStyles,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import * as Sentry from '@sentry/node';

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

const ErrorComponent: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Typography gutterBottom align="center" variant="h2">
        Error!
      </Typography>
      <Typography
        className={classes.description}
        gutterBottom
        align="center"
        variant="h5"
      >
        Please try again in a few minutes.
      </Typography>
    </div>
  );
};

const ErrorComponentWithStyles = withStyles(styles)(ErrorComponent);

const ErrorPage: NextPage<{}> = () => <ErrorComponentWithStyles />;

ErrorPage.getInitialProps = async (props) => {
  const { res, err, asPath } = props;

  if (res) {
    // Running on the server, the response object is available.
    //
    // Next.js will pass an err on the server if a page's `getInitialProps`
    // threw or returned a Promise that rejected

    if (res.statusCode === 404) {
      // Opinionated: do not record an exception in Sentry for 404
      return { statusCode: 404 };
    }

    if (err) {
      Sentry.captureException(err);

      return props;
    }
  } else {
    // Running on the client (browser).
    //
    // Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html
    if (err) {
      Sentry.captureException(err);

      return props;
    }
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return props;
};

export default withStyles(styles)(ErrorPage);
