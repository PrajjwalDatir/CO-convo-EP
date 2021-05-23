import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import App from './App';

describe('<App />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <StaticRouter>
        <App />
      </StaticRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
