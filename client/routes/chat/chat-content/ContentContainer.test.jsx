import React from 'react';
import { mount } from 'enzyme';
import ContentContainer from './ContentContainer';

describe('<ContentContainer />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<ContentContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});
