import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import Chat from './index';

jest.mock('uuid/v4', () => {
  let i = 0;

  return () => {
    i += 1;
    return i;
  };
});

describe('<Chat />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <StaticRouter>
        <Chat />
      </StaticRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
