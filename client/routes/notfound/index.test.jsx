import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import NotFound from './index';

describe('<NotFound />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <StaticRouter>
        <NotFound />
      </StaticRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
