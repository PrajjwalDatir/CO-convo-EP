import React from 'react';
import { mount } from 'enzyme';
import ContentError from './ContentError';

describe('<ContentError />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<ContentError />);
    expect(wrapper).toMatchSnapshot();
  });
});
