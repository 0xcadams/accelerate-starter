import * as React from 'react';

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

import MarkdownPage from '@components/MarkdownPage';

import termsMd from '../src/content/terms.md';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10)
    }
  });

const TermsPage: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const title = 'Terms of Use';
  const subtitle = 'Last Modified on April 3, 2019';

  return (
    <>
      <div className={classes.container}>
        <MarkdownPage title={title} subtitle={subtitle} md={termsMd} />
      </div>
    </>
  );
};

export default withStyles(styles)(TermsPage);
