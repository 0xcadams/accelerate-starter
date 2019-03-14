import * as React from 'react';
import { connect } from 'react-redux';
import { Image, Segment } from 'semantic-ui-react';

import { IMessage } from '@Models/Message';
import { IMessageState, IStore } from '@Reducers';

export class Messages extends React.Component<IMessageState, {}> {
  public render(): JSX.Element {
    const { isFetching, error, messages } = this.props;

    return (
      <div style={{ fontSize: '1.33em' }}>
        <Segment.Group id="messages-sgmt-grp" raised>
          {isFetching ? (
            <Segment loading>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          ) : error ? (
            <Segment>Error: {error.message}</Segment>
          ) : messages.length <= 0 ? (
            <Segment>No messages.</Segment>
          ) : (
            messages.map((message: IMessage) => (
              <Segment key={message._id}>{message.body}</Segment>
            ))
          )}
        </Segment.Group>
      </div>
    );
  }
}

export default connect((state: IStore): IMessageState => state.message)(
  Messages
);
