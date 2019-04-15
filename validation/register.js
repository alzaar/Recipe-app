const Validator = require('validator');
const isEmpty = require('./is-empty');

function validateRegisterInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  console.log(Validator.isEmpty(data.password));
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isLength(data.email, { min: 2, max: 30 })) {
    errors.email = 'Email must be between 2 and 30'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = 'Password must between 2 and 30'
  }

  if (!Validator.isLength(data.password2, { min: 2, max: 30 })) {
    errors.password2 = 'Password must between 2 and 30'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Password is required'
  }

  if (data.password !== data.password2) {
    errors.password = 'Passwords do not match';
    errors.password2 = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInput;
