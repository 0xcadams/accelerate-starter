import * as React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';

export default class AboutPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                About
              </Header>
              <p>
                This is a project to help a team quickly jump past common
                hurdles, such as login/sign-up pages, and begin solving their
                core business issues.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <Image
                rounded
                size="large"
                src="/static/accelerate-starter.png"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
