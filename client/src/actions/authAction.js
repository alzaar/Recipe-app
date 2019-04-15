import { GET_ERRORS } from './types.js';
import { SET_CURRENT_USER } from './types.js';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';

import axios from 'axios';

//User Signup
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/user/signup', userData)
    //Redirect to Login by using history
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

//User login
export const userLogin = (userData) => dispatch => {
  axios.post('/api/user/login', userData)
    .then(res => {
      const { token } = res.data;
      //Save token to storage
      localStorage.setItem('jwtToken', token);
      //Set token to auth header
      setAuthToken(token);
      //Decode Token
      const decoded = jwt_decode(token);
      //Dispatch Action with decoded token
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>  dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

//Dispatch User
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//Logout User
export const logoutUser = () => dispatch => {
  //Remove Token from storage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
}
