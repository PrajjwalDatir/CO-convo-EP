import React from 'react';
import { mount } from 'enzyme';
import MessageTextArea from './MessageTextArea';
import { ChatContext } from '../reducer';
import { getInitialState } from '../shared';

const dispatch = jest.fn();

describe('<MessageTextArea />', () => {
  let state;

  beforeEach(() => {
    state = getInitialState();
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <ChatContext.Provider value={[state, dispatch]}>
        <MessageTextArea />
      </ChatContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
