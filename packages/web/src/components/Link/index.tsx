import * as React from 'react';

import { createStyles, WithStyles, withStyles } from '@material-ui/core';

import { default as NextLink, LinkProps } from 'next/link';
import { OutboundLink } from 'react-ga';

const styles = () =>
  createStyles({
    link: {
      textDecoration: 'none'
    }
  });

interface IProps extends LinkProps {}

const Link: React.FC<IProps & WithStyles<typeof styles>> = ({
  classes,
  href,
  children
}) =>
  href && String(href).includes('http') ? (
    <OutboundLink
      eventLabel={`clicked ${href}`}
      to={String(href)}
      target="_blank"
      className={classes.link}
    >
      {children}
    </OutboundLink>
  ) : (
    <NextLink href={href}>
      <a className={classes.link}>{children}</a>
    </NextLink>
  );

export default withStyles(styles)(Link);
