import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import Link from './index';

describe('<Link />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <StaticRouter>
        <Link to="/" />
      </StaticRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
