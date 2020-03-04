import * as React from 'react';

import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { default as ReactMarkdown } from 'markdown-to-jsx';

const options = {
  overrides: {
    h1: {
      component: (props) => <Typography gutterBottom variant="h4" {...props} />
    },
    h2: {
      component: (props) => <Typography gutterBottom variant="h6" {...props} />
    },
    h3: {
      component: (props) => (
        <Typography gutterBottom variant="subtitle1" {...props} />
      )
    },
    h4: {
      component: (props) => (
        <Typography gutterBottom variant="caption" paragraph {...props} />
      )
    },
    p: { component: (props) => <Typography paragraph {...props} /> },
    hr: { component: (props) => <Divider variant="middle" {...props} /> },
    li: {
      component: (props) => (
        <li>
          <Typography component="span" {...props} />
        </li>
      )
    }
  }
};

const MarkdownPage: React.FC<{}> = (props) => (
  <ReactMarkdown options={options} {...props} />
);

export default MarkdownPage;
