import * as React from 'react';
import { shallow } from 'enzyme';

import { Segment } from 'semantic-ui-react';

import { Messages } from './../index';

const loadingState = {
  lastUpdated: 0,
  isFetching: true,
  messages: []
};

const loadedState = {
  lastUpdated: 0,
  isFetching: false,
  messages: [
    { _id: '1', body: '1' },
    { _id: '2', body: '2' },
    { _id: '3', body: '3' }
  ]
};

describe('<Messages />', () => {
  it('renders the segment as loading', () => {
    const login = shallow(<Messages { ...loadingState } />);
    expect(login.find(Segment).prop('loading')).equals(true);
  });

  it('renders the messages', () => {
    const login = shallow(<Messages { ...loadedState } />);
    expect(login.find(Segment).every(e => e.prop('loading') === false));
    expect(login.find(Segment)).length(3);
  });
});
