import {
  GET_COMMENTS,
} from '../actions/types';

const initialState = {
  comments: []
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    default:
      return state;
  }
}
