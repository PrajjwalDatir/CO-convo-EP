import React from 'react';
import { mount } from 'enzyme';
import HomeActionButtons from './HomeActionButtons';

describe('<HomeActionButtons />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<HomeActionButtons />);
    expect(wrapper).toMatchSnapshot();
  });
});
