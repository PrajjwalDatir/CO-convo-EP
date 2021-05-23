import React from 'react';
import { mount } from 'enzyme';
import PopupMenu from './index';

describe('<PopupMenu />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<PopupMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
