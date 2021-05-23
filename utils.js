const { validationResult } = require('express-validator');
const R = require('ramda');
// https://tailwindcss.com/docs/configuration/#referencing-in-javascript
const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('./tailwind.config');

const { theme } = resolveConfig(tailwindConfig);

/*
  console.log, but it returns the value that was passed in. This
  function is useful for inspecting the value in a promise chain, or
  when composing functions.

  usage:
    Promise.resolve(5)
      .then(inspect) // prints 5
      .then(five => doSomething(five))
      .then(inspect) // prints return value of doSomething
*/
function inspect(x) {
  console.log(x); // eslint-disable-line no-console
  return x;
}

/*
  check if an object has a value for every key passed in.

  usage:
    hasProps(['foo', 'bar'], { foo: 10, bar: 20 }) === true
    hasProps(['foo', 'bar'], { bar: 20, baz: 30 }) === false
*/
const hasProps = R.curry((props, obj) =>
  R.compose(R.all(R.identity), R.values, R.pickAll(props))(obj),
);

// middleware for express validation
// any validation errors are sent to client
function handleValidation(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: errors.mapped() });
  }
}

const handleRequestValidationError = R.curry((form, error) => {
  const paramErrors = error.response.data.errors;

  if (!paramErrors) {
    throw error;
  }

  R.forEachObjIndexed((value, key) => {
    form.setError(key, 'paramError', value && value.msg);
  }, paramErrors);
});

module.exports = {
  theme,
  inspect,
  hasProps,
  handleValidation,
  handleRequestValidationError,
};
