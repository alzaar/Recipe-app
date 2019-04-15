const isEmpty = require('./is-empty');
const Validator = require('validator');

function validateRecipeInput(data) {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.instructions = !isEmpty(data.instructions) ? data.instructions : '';
  data.image = !isEmpty(data.image) ? data.image : '';
  data.readyInMinutes = !isEmpty(data.readyInMinutes) ? data.readyInMinutes.toString(10) : '';
  data.servings = !isEmpty(data.servings) ? data.servings.toString(10) : '';
  data.id = !isEmpty(data.id) ? data.id.toString(10) : '';

  if (Validator.isEmpty(data.tite)) {
    errors.tite = 'Must have a Title';
  }

  if (Validator.isEmpty(data.instructions)) {
    errors.instructions = 'Must have instructions';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = 'Must have image URL';
  }

  if (Validator.isEmpty(data.readyInMinutes)) {
    errors.readyInMinutes = 'Must have Time'
  }

  if (Validator.isEmpty(data.servings)) {
    errors.servings = 'Must have servings';
  }

  if (Validator.isEmpty(data.id)) {
    errors.id = 'Must have ID';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRecipeInput
