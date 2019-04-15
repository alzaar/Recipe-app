import axios from 'axios';
import { GET_RECIPE, GET_INGREDIENTS, ADD_INGREDIENT, DELETE_INGREDIENT, SELECT_RECIPE, SIMILAR_RECIPES, CLEAR_INGREDIENTS, GET_STORED_RECIPES, REMOVE_RECIPE } from './types';
//Search query URL
import { url } from '../config/apiCall';
//API config
import { apiCallConfig } from '../config/apiCall';

//API CALL to get recipes
export const getRecipeByIngredients = searchValue => dispatch => {
  axios.get(url.recipeByIngredients+searchValue, apiCallConfig)
  .then(res => {
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  })
  .catch(err => console.log(err));
}

//API CALL TO GET similar recipes
export const getSimilarRecipe = searchValue => dispatch => {
  axios.get(url.similarRecipes + searchValue + '/similar', apiCallConfig)
  .then(res => {
    if (res) {
    dispatch({
      type: SIMILAR_RECIPES,
      payload: res
    })
  }
  })
}

//GET SINGLE RECIPE details
export const getRecipeInfo = (searchValue, history) => dispatch => {
  let link = url.recipeInfo + searchValue + '/information';
  axios.get(link, apiCallConfig)
  .then(res =>{
    dispatch({
      type:SELECT_RECIPE,
      payload: res.data
    })
    history.push('/recipe');
  }
  );
}

// ingredients stored in State
export const getIngredients = ingredients => dispatch => {
  dispatch({
    type: GET_INGREDIENTS,
    payload: ingredients
  })
}

//add ingredients to state
export const addIngredients = ingredient => dispatch => {
  dispatch({
    type: ADD_INGREDIENT,
    payload: ingredient
  })
}

//delete ingredients to state
export const deleteIngredient = ingredient => dispatch => {
  dispatch({
    type: DELETE_INGREDIENT,
    payload: ingredient
  })
}

//Storing Recipe
export const storeRecipe = (recipe, user) => dispatch => {
  const token = {
    Authorization: localStorage.getItem('jwtToken')
  }
  axios.post('/api/profile/recipesstored', recipe, token)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err.response.data)
    })
}

export const clearIngredients = () => dispatch => {
  return {
    type: CLEAR_INGREDIENTS,
    payload: []
  }
}

export const getStoredRecipes = () => dispatch => {
  const token = {
    Authorization: localStorage.getItem('jwtToken')
  }
  axios.get('/api/profile/getrecipes', token)
    .then(res => {
      if (res) {
        dispatch({
          type: GET_STORED_RECIPES,
          payload: res
        })
      }
    })
    .catch(err => console.log(err))
}

export const removeRecipe = (id) => dispatch => {
  const token = {
    Authorization: localStorage.getItem('jwtToken')
  };
  axios.delete(`/api/profile/recipesstored/${id}`, token)
    .then(res =>
      dispatch({
        type:REMOVE_RECIPE,
        payload: res.data.recipesStored
      })
    )
    .catch(err => console.log(err.response))

}
