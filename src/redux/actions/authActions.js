// src/redux/actions/authActions.js
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
  } from './types';
  import authService from '../../services/authService';
  
  export const login = (username, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
  
    try {
      const data = await authService.login({ username, password });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      return Promise.resolve(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: LOGIN_FAILURE,
        payload: message,
      });
      return Promise.reject(error);
    }
  };
  
  export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
  
    try {
      const data = await authService.register(userData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
      return Promise.resolve(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: REGISTER_FAILURE,
        payload: message,
      });
      return Promise.reject(error);
    }
  };
  
  export const logout = () => (dispatch) => {
    authService.logout();
    dispatch({ type: LOGOUT });
  };
  
  export const getUserProfile = () => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
  
    try {
      const data = await authService.getUserProfile();
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data,
      });
      return Promise.resolve(data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GET_PROFILE_FAILURE,
        payload: message,
      });
      return Promise.reject(error);
    }
  };