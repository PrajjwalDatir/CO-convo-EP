import React from 'react';
import { mount } from 'enzyme';
import { FormContext } from 'react-hook-form';
import * as R from 'ramda';
import UserCardFormField from './UserCardFormField';

describe('<UserCardFormField />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <FormContext {...{ errors: jest.fn() }}>
        <UserCardFormField
          label="Password"
          name="password"
          type="password"
          register={R.always()}
        />
        ,
      </FormContext>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
