import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import recipeReducer from './recipeReducer';
import profileReducer from './profileReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  recipe: recipeReducer,
  profile: profileReducer,
  comment: commentReducer
})
