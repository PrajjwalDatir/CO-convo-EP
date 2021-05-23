import React from 'react';
import { mount } from 'enzyme';
import ChatChannelSidebar from './ChatChannelSidebar';
import { ChatContext } from '../reducer';
import { getInitialState } from '../shared';

const dispatch = jest.fn();

describe('<ChatChannelSidebar />', () => {
  let state;

  beforeEach(() => {
    state = getInitialState();
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <ChatContext.Provider value={[state, dispatch]}>
        <ChatChannelSidebar />
      </ChatContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
