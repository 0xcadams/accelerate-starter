import * as React from 'react';

import {
  createStyles,
  Divider,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';

import Markdown from './Markdown';

const styles = (theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(2)
    },
    markdown: {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(2),
      maxWidth: theme.breakpoints.values.lg
    }
  });

interface IProps extends React.Props<{}> {
  title: string;
  subtitle: string;
  md?: string;
}

const MarkdownPage: React.FC<IProps & WithStyles<typeof styles>> = ({
  classes,
  title,
  subtitle,
  md
}) => (
  <>
    <Typography gutterBottom align="center" variant="h2">
      {title}
    </Typography>
    <Typography gutterBottom align="center" variant="h6">
      {subtitle}
    </Typography>
    {md && (
      <>
        <Divider className={classes.divider} variant="middle" />
        <div className={classes.markdown}>
          <Markdown>{md}</Markdown>
        </div>
      </>
    )}
  </>
);

export default withStyles(styles)(MarkdownPage);
