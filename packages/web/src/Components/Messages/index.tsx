import * as React from 'react';
import { connect } from 'react-redux';
import { Segment, Placeholder, Message } from 'semantic-ui-react';

import { IMessage } from '@Models/Message';
import { IMessageState, IStore } from '@Reducers';

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
        <Message id="no-messages-warning-msg" >No messages.</Message>
      ) : (
        messages.map((message: IMessage) => (
          <Segment className="message-sgmt" key={message._id}>{message.body}</Segment>
        ))
      )}
    </Segment.Group>
  </div>
);

export default connect((state: IStore): IMessageState => state.message)(
  Messages
);
