import React from 'react';
import { mount } from 'enzyme';
import SidebarChannelButton from './SidebarChannelButton';

describe('<SidebarChannelButton />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<SidebarChannelButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
