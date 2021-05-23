import React from 'react';
import { mount } from 'enzyme';
import ChatMessage from './ChatMessage';

describe('<ChatMessage />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <ChatMessage
        message={{
          user: { username: 'user' },
          sent: '2019-11-23T21:00:39.290Z',
          message: 'hi',
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
