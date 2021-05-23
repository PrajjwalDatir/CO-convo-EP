import React from 'react';
import { mount } from 'enzyme';
import ChatContent from './ChatContent';
import { ChatContext } from '../reducer';
import { getInitialState } from '../shared';

const dispatch = jest.fn();

describe('<ChatContent />', () => {
  let state;

  beforeEach(() => {
    state = getInitialState();
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <ChatContext.Provider value={[state, dispatch]}>
        <ChatContent />
      </ChatContext.Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
