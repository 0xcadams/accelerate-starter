import * as React from 'react';
import { connect } from 'react-redux';
import { Item, Message, Placeholder, Segment } from 'semantic-ui-react';

import { IMessage } from '@accelerate-starter/core';
import { IMessageState, IStore } from '@reducers';

export const Messages: React.FC<IMessageState> = ({
  isFetching,
  error,
  messages
}) => (
  <div style={{ fontSize: '1.33em' }}>
    <Segment.Group id="messages-sgmt-grp" raised>
      {isFetching ? (
        <Segment>
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        </Segment>
      ) : error ? (
        <Message id="unauthorized-warning-msg" warning attached="bottom">
          {error.code === 401
            ? 'You must log in to create and view messages.'
            : 'Please wait a few seconds and refresh your page.'}
        </Message>
      ) : messages.length <= 0 ? (
        <Message id="no-messages-warning-msg">No messages.</Message>
      ) : (
        <Segment padded>
          <Item.Group divided>
            {messages.map((message: IMessage) => (
              <Item className="message-item" key={message._id}>
                <Item.Image
                  size="tiny"
                  src={message.owner && message.owner.avatar}
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header>{message.owner.name}</Item.Header>
                  <Item.Description>{message.body}</Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      )}
    </Segment.Group>
  </div>
);

export default connect((state: IStore): IMessageState => state.message)(
  Messages
);
