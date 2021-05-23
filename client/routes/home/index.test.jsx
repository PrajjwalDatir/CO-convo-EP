import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import Home from './index';

describe('<Home />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <StaticRouter>
        <Home />
      </StaticRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
