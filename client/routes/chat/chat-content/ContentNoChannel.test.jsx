import React from 'react';
import { mount } from 'enzyme';
import ContentNoChannel from './ContentNoChannel';

describe('<ContentNoChannel />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<ContentNoChannel />);
    expect(wrapper).toMatchSnapshot();
  });
});
