import React from 'react';
import { mount } from 'enzyme';
import Card from './index';

describe('<Card />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<Card />);
    expect(wrapper).toMatchSnapshot();
  });
});
