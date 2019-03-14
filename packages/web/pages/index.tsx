import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react';

import * as MessageActions from '@Actions/MessageActions';
import Messages from '@Components/Messages';

// type IProps = typeof MessageActions.getMessages & IMessageState;

class HomePage extends React.Component<any, {}> {
  // TODO fix these types
  public async componentDidMount() {
    await this.props.getMessages();
  }

  public render(): JSX.Element {
    const { getMessages, createMessage } = this.props;

    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                Messages
              </Header>
              <Messages />
            </Grid.Column>
            <Grid.Column floated="right" width={4}>
              <Image
                rounded
                size="large"
                src="/static/accelerate-starter.png"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button
                onClick={() =>
                  createMessage({ body: `${Math.round(Math.random() * 10)}` })
                }
                size="huge"
              >
                Add a Message
              </Button>
              <Button onClick={getMessages} size="huge">
                Get Messages
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default connect(
  () => ({}),
  {
    createMessage: MessageActions.createMessage.request,
    getMessages: MessageActions.getMessages.request
  }
)(HomePage);
