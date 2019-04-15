import { GET_RECIPE,  ADD_INGREDIENT, DELETE_INGREDIENT, SELECT_RECIPE, SIMILAR_RECIPES, CLEAR_INGREDIENTS, GET_STORED_RECIPES, REMOVE_RECIPE } from '../actions/types';
const initialState = {
  data: [],
  ingredients: [],
  recipe: {
    id: '',
    title: '',
    servings: '',
    image: '',
    readyInMinutes: '',
    instructions: ''
  },
  similarRecipes: [],
  storedRecipes: []
}
export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPE:
      return {
        ...state,
        data: action.payload
      };
    case ADD_INGREDIENT:
      let ingredients = state.ingredients;
      ingredients.push(action.payload);
      return {
        ...state,
        ingredients: ingredients
      }
    case DELETE_INGREDIENT:
      let new_ingredients = state.ingredients;
      new_ingredients.splice( new_ingredients.indexOf(action.payload), 1);
      return {
        ...state,
        ingredients: new_ingredients
      }
    case SELECT_RECIPE:
      return {
        ...state,
        recipe: {
          id: action.payload.id,
          title: action.payload.title,
          servings: action.payload.servings,
          image: action.payload.image,
          readyInMinutes: action.payload.readyInMinutes,
          instructions: action.payload.instructions
        }
      }
    case SIMILAR_RECIPES:
      return {
        ...state,
        similarRecipes: action.payload
      }
    case CLEAR_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      }
    case GET_STORED_RECIPES:
      return {
        ...state,
        storedRecipes: action.payload
      }
    case REMOVE_RECIPE:
      return {
        ...state,
        recipesStored: action.payload
      }
    default:
      return state;
  }
}
