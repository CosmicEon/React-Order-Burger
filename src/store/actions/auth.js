/* globals localStorage */
import axios from 'axios';
import * as actionTypes from './actionTypes';


// eslint-disable-next-line
const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

// eslint-disable-next-line
const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

// eslint-disable-next-line
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};
// eslint-disable-next-line
export const logout = (error) => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// eslint-disable-next-line
const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// eslint-disable-next-line
export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    // SingUp User
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCvYSTfgDxwLybZ5rxqkkPnCSgkeXeMxGo';
    if (!isSignUp) {
      // SingIn User
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCvYSTfgDxwLybZ5rxqkkPnCSgkeXeMxGo';
    }

    axios.post(url, authData)
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const sethAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        const expirationDateInSeconds = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(checkAuthTimeout(expirationDateInSeconds));
      } else {
        dispatch(logout());
      }
    }
  };
};
