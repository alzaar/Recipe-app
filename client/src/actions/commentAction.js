import {
  GET_COMMENTS,
  ADD_COMMENT
} from './types';

import axios from 'axios';

export const addComment = (commentData) => dispatch => {
  const data = {
    Authorization: localStorage.getItem('jwtToken'),
    commentData
  }
  axios.post(`/api/comment`, data)
    .then(res => dispatch(getComments(data.commentData.recipe_id)))
    .catch(err => console.log(err.response));
}

//Get all comments
export const getComments = (recipe_id) => dispatch => {
  axios.get(`/api/comment/${recipe_id}`)
    .then(res => {
      if (res) {
        dispatch({
          type: GET_COMMENTS,
          payload: res
        })
      }
    }
  )
    .catch(err => console.log(err));
}
