import React from 'react';
import { mount } from 'enzyme';
import * as R from 'ramda';
import Input from './index';

describe('<Input />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(<Input value="" onChange={R.always()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
