import React from "react";
import { useHistory } from "react-router-dom";
import useForm, { FormContext } from "react-hook-form";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isDate from "validator/lib/isDate";
import * as R from "ramda";
import UserCardForm from "#/components/form/UserCardForm";
import UserCardFormField from "#/components/form/UserCardFormField";
import Card from "#/components/card";
import FancyLink from "#/components/fancy-link";
import fallImage from "#/assets/images/undraw_fall.svg";
import successImage from "#/assets/images/undraw_order_confirmed.svg";
import StudentGraphic from "#/icons/StudentGraphic.svg";
import { UserContext } from "#/Provider";
import useEffectOnce from "#/hooks/useEffectOnce";
import { handleRequestValidationError } from "#/../utils";

function Register() {
  const [registered, setRegistered] = React.useState(false);
  const form = useForm();
  const history = useHistory();
  const [user] = React.useContext(UserContext);

  useEffectOnce(() => {
    if (user) {
      history.replace("/");
    }
  });

  const onSubmit = React.useCallback(
    (data) =>{
      console.log(data);
      axios
        .post("/api/users", data)
        .then(() => setRegistered(true))
        .catch(handleRequestValidationError(form)),
    [form]}
  );

  if (registered) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Card className="flex flex-col items-center">
        <h1 className="text-4xl font-light mb-4">You&apos;re In!</h1>
        <img alt="Boy studying" src={StudentGraphic} style={{ width: 400 }} />
        <div className="text-2xl mt-8">
          <FancyLink to="/login">Login and start chatting!</FancyLink>
        </div>
      </Card>
    </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <FormContext {...form}>
        <UserCardForm
          header="Create an account"
          image={StudentGraphic}
          alt="Student Studying"
          buttonText="Register"
          underButton={<FancyLink to="/login">Already registered?</FancyLink>}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <UserCardFormField
            label="First Name"
            name="firstname"
            type="text"
            register={form.register({
              required: "First Name is required",
              // validate: isEmpty
            })}
          />
          <UserCardFormField
            label="Last Name"
            name="lastname"
            type="text"
            register={form.register({
              required: "Last Name is required",
              // validate: isEmpty
            })}
          />
          <UserCardFormField
            label="Date of Birth"
            name="dob"
            type="date"
            register={form.register({
              required: "DOB is required",
              validate: isDate,
            })}
          />
          <UserCardFormField
            label="Email"
            name="email"
            type="email"
            register={form.register({
              required: "Email is required",
              validate: R.o(R.or(R.__, "Not a valid Email"), isEmail),
            })}
          />

          <UserCardFormField
            label="Username"
            name="username"
            type="text"
            register={form.register({ required: "Username is required" })}
          />
          <UserCardFormField
            label="Password"
            name="password"
            type="password"
            register={form.register({
              required: "Password is required",
              minLength: {
                value: 8 ,
                message: "Must have at least 8 characters",
              },
            })}
          />
        </UserCardForm>
      </FormContext>
    </div>
  );
}

export default Register;
