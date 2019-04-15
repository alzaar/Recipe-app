const isEmpty = require('./is-empty');
const Validator = require('validator');

function validateProfileInput(data) {
  const errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.bio = !isEmpty(data.bio) ? data.bio : '';
  //data = handle + bio
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle required'
  }

  if (!Validator.isLength(data.handle, { min: 4, max: 40 })) {
    errors.handle = 'Handle must be between 4 and 40 characters';
  }

  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Bio is Required';
  }

  if (!Validator.isLength(data.bio, { min: 2, max: 300 })) {
    errors.bio = 'Bio must be between 2 and 300 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateProfileInput
