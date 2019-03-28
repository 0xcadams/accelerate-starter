import * as React from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react';
import { default as uuid } from 'uuid/v4';

import * as MessageActions from '@actions/MessageActions';
import Messages from '@components/Messages';

const mapDispatchToProps = {
  createMessage: MessageActions.createMessage.request,
  getMessages: MessageActions.getMessages.request
};

export const HomePage: React.FC<typeof mapDispatchToProps> = ({
  getMessages,
  createMessage
}) => {
  React.useEffect(() => {
    getMessages();
  });

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
              alt="Accelerate Starter Logo"
              rounded
              size="large"
              src={'/static/accelerate-starter.png'}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Button
              id="add-message-btn"
              onClick={() => createMessage({ body: uuid() })}
              size="huge"
            >
              Add a Message
            </Button>
            <Button
              id="get-messages-btn"
              onClick={() => getMessages()}
              size="huge"
            >
              Get Messages
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default connect(
  () => ({}),
  mapDispatchToProps
)(HomePage);
