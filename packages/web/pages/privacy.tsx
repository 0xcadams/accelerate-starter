import * as React from 'react';

import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

import MarkdownPage from '@components/MarkdownPage';

import privacyMd from '../src/content/privacy.md';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(10)
    }
  });

const PrivacyPage: React.FC<WithStyles<typeof styles>> = ({ classes }) => {
  const title = 'Privacy Policy';
  const subtitle = 'Last Modified on April 3, 2019';

  return (
    <>
      <div className={classes.container}>
        <MarkdownPage title={title} subtitle={subtitle} md={privacyMd} />
      </div>
    </>
  );
};

export default withStyles(styles)(PrivacyPage);
