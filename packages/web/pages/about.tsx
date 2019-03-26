import * as React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import packageJson from '../../../package.json';

const AboutPage: React.FC<void> = () => (
  <Segment style={{ padding: '8em 0em' }} vertical>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" style={{ fontSize: '2em' }}>
            About
          </Header>
          <p>{packageJson.description}</p>
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
          <Image rounded size="large" src="/static/accelerate-starter.png" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default AboutPage;
