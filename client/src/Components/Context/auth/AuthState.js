import React, { useReducer } from 'react';
import useAuthReducer from './useAuthReducer';
import AuthContext from './AuthContext';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../profile/profileTypes';
import setAuthToken from '../../Utility/setAuthToken';
import configHeader from '../../Utility/configHeader';

const authInitialState = {
  token: localStorage.getItem('token'),
  isAuthentucated: null,
  loading: true,
  user: null,
  error: null
};

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(useAuthReducer, authInitialState);

  // Load User
  const loadUser = async () => {
    //   check if token is in localStrorage to load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  // Register User
  const registerUser = async formData => {
    try {
      const res = await axios.post('/api/users', formData, configHeader);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      // Load User
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };
  // Login User
  const loginUser = async formData => {
    try {
      const res = await axios.post('/api/auth', formData, configHeader);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      // Load User
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  // Clear Erros
  const clearErros = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loadUser,
        registerUser,
        loginUser,
        logout,
        clearErros
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
