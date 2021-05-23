import React from 'react';
import { mount } from 'enzyme';
import NewChannelModal from './NewChannelModal';
import { ChatContext } from '../reducer';
import { getInitialState } from '../shared';

const dispatch = jest.fn();

describe('<NewChannelModal />', () => {
  let state;

  beforeEach(() => {
    state = getInitialState();
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <ChatContext.Provider value={[state, dispatch]}>
        <NewChannelModal />
      </ChatContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
