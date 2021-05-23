import React from 'react';
import { mount } from 'enzyme';
import * as R from 'ramda';
import UserCardForm from './UserCardForm';

describe('<UserCardForm />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <UserCardForm header="" buttonText="" onSubmit={R.always()} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the function passed in onSubmit', () => {
    const mock = jest.fn();
    const wrapper = mount(
      <UserCardForm header="" buttonText="" onSubmit={mock} />,
    );
    wrapper.find('button[type="submit"]').simulate('submit');
    expect(mock).toHaveBeenCalled();
  });

  // TODO
  it('should only take <LoginCardFormField /> as children', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    mount(
      <UserCardForm header="" buttonText="" onSubmit={R.always()}>
        <h1>Not LoginCardFormField</h1>
      </UserCardForm>,
    );
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
