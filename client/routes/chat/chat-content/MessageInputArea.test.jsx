import React from 'react';
import { mount } from 'enzyme';
import MessageInputArea from './MessageInputArea';
import { ChatContext } from '../reducer';
import { getInitialState } from '../shared';

const dispatch = jest.fn();

describe('<MessageInputArea />', () => {
  let state;

  beforeEach(() => {
    state = getInitialState();
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <ChatContext.Provider value={[state, dispatch]}>
        <MessageInputArea />
      </ChatContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
