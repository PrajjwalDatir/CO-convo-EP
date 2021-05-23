import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import FancyLink from './index';

describe('<FancyLink />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <StaticRouter>
        <FancyLink to="/" />
      </StaticRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
