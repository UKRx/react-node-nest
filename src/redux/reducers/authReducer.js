// src/redux/reducers/authReducer.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
  } from '../actions/types';
  
  const token = localStorage.getItem('token');
  
  const initialState = {
    isLoggedIn: !!token,
    token: token,
    user: null,
    loading: false,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
      case GET_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload.access_token,
          user: action.payload.user,
          loading: false,
          error: null,
        };
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
      case GET_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;