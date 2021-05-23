import React from 'react';
import { useHistory } from 'react-router-dom';
import useForm, { FormContext } from 'react-hook-form';
import axios from 'axios';
import UserCardForm from '#/components/form/UserCardForm';
import UserCardFormField from '#/components/form/UserCardFormField';
import FancyLink from '#/components/fancy-link';
import enterImage from '#/assets/images/undraw_enter.svg';
import StudentGraphic from '#/icons/StudentGraphic.svg'
import { UserContext } from '#/Provider';
import useEffectOnce from '#/hooks/useEffectOnce';
import { handleRequestValidationError } from '#/../utils';

function Login() {
  const form = useForm();
  const history = useHistory();
  const [user, setUser] = React.useContext(UserContext);

  useEffectOnce(() => {
    if (user) {
      history.replace('/');
    }
  });

  const onSubmit = React.useCallback(
    formData =>
      axios
        .post('/api/users/auth', formData)
        .then(response => response.data)
        .then(data => setUser({ ...data.user, token: data.token }))
        .then(() => history.push('/chat'))
        .catch(handleRequestValidationError(form)),
    [form, history, setUser],
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <FormContext {...form}>
        <UserCardForm
          header="Login"
          image={StudentGraphic}
          alt="Boy Studying"
          underButton={<FancyLink to="/register">Need an account?</FancyLink>}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <UserCardFormField
            label="Username"
            name="username"
            type="text"
            register={form.register({ required: 'Username is required' })}
          />
          <UserCardFormField
            label="Password"
            name="password"
            type="password"
            register={form.register({ required: 'Password is required' })}
          />
        </UserCardForm>
      </FormContext>
    </div>
  );
}

export default Login;
