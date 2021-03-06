import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

//GET current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: {}
    }))
}

//Profile PROFILE_LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  }
}

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  }
}
//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
//Delete Profile
export const deleteProfile = (history) => dispatch => {
  axios.delete('/api/profile/')
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}
