import React from 'react';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';
import Register from './index';

describe('<Register />', () => {
  it('should match snapshot', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a email field', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );
    const email = wrapper.find('input[type="email"][name="email"]');
    expect(email).toHaveLength(1);
  });

  it('should have a username field', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );
    const username = wrapper.find('input[name="username"]');
    expect(username).toHaveLength(1);
  });

  it('should have a password field', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );
    const password = wrapper.find('input[type="password"][name="password"]');
    expect(password).toHaveLength(1);
  });

  it('should have a register button', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );
    const button = wrapper.find('button[type="submit"]');
    expect(button).toHaveLength(1);
  });

  it('should update the email field', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );

    wrapper
      .find('input[type="email"][name="email"]')
      .simulate('change', { target: { value: 'some@email.com' } });

    expect(
      wrapper.find('input[type="email"][name="email"]').prop('value'),
    ).toBe('some@email.com');
  });

  it('should update the username field', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );

    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: 'some-username' } });

    expect(wrapper.find('input[name="username"]').prop('value')).toBe(
      'some-username',
    );
  });

  it('should update the password field', () => {
    const wrapper = mount(
      <StaticRouter>
        <Register />
      </StaticRouter>,
    );

    wrapper
      .find('input[type="password"][name="password"]')
      .simulate('change', { target: { value: 'some-password' } });

    expect(
      wrapper.find('input[type="password"][name="password"]').prop('value'),
    ).toBe('some-password');
  });
});
