import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

import { Item, Placeholder, Segment } from 'semantic-ui-react';

import { IUser } from '@accelerate-starter/core';
import { IMessageState } from '@Reducers';
import { Messages } from '.';

const loadingState = {
  lastUpdated: 0,
  isFetching: true,
  messages: []
};

const exampleOwner: IUser = {
  email: 'test@gmail.com',
  password: 'ee2r2',
  avatar: 'gravatar.com/123'
};

const loadedState: IMessageState = {
  lastUpdated: 0,
  isFetching: false,
  messages: [
    { _id: '1', body: '1', owner: exampleOwner },
    { _id: '2', body: '2', owner: exampleOwner },
    { _id: '3', body: '3', owner: exampleOwner }
  ]
};

describe('<Messages />', () => {
  it('renders the segment as loading', () => {
    const login = shallow(<Messages {...loadingState} />);
    expect(login.find(Placeholder).exists()).to.equal(true);
  });

  it('renders the messages', () => {
    const login = shallow(<Messages {...loadedState} />);
    expect(login.find(Item).length).to.equal(3);
  });
});
