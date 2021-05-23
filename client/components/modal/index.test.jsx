import React from 'react';
import { mount } from 'enzyme';
import Modal from './index';

describe('<Modal />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });
});
