import * as React from 'react';

import {
  createStyles,
  Grid,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import classnames from 'classnames';

import Link from '@components/Link';

const styles = (theme: Theme) =>
  createStyles({
    link: {
      cursor: 'pointer'
    },
    layout: {
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      maxWidth: theme.breakpoints.values.md
    },
    footer: {
      marginTop: theme.spacing(4),
      borderTop: `2px solid ${theme.palette.divider}`
    },
    copyright: {
      marginTop: theme.spacing(4),
      paddingTop: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.divider}`,
      display: 'flex',
      alignItems: 'center'
    },
    copyrightIcon: {
      marginLeft: theme.spacing(1)
    }
  });

interface IProps extends React.Props<{}> {}

const Footer: React.FC<IProps & WithStyles<typeof styles>> = ({ classes }) => {
  const footers = [
    {
      title: 'Company',
      description: [
        { text: 'Home', href: '/' },
        { text: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Support',
      description: [
        { text: 'Help', href: '/support' },
        { text: 'Feedback', href: '/feedback' }
      ]
    },
    {
      title: 'Legal',
      description: [
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Use', href: '/terms' }
      ]
    }
  ];

  return (
    <footer className={classnames(classes.footer, classes.layout)}>
      <div>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map((item) => (
                <Link key={item.text} href={item.href}>
                  <Typography
                    className={classes.link}
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    {item.text}
                  </Typography>
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.copyright}>
        <Typography variant="subtitle2" color="textPrimary">
          © {new Date().getFullYear()} Valure, LLC. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default withStyles(styles)(Footer);
