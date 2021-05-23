import React from 'react';
import { mount } from 'enzyme';
import ContentLoading from './ContentLoading';

describe('<ContentLoading />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<ContentLoading />);
    expect(wrapper).toMatchSnapshot();
  });
});
