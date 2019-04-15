const isEmpty = require('./is-empty');
const Validator = require('validator');

function validatePostInput(data) {
  const errors = {};
  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 2, max: 300 })) {
    errors.text = 'Text must be between 10 and 300';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validatePostInput;
