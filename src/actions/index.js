import axios from 'axios';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  CREATE_GROUP: 'CREATE_GROUP',

  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

const ROOT_URL = 'http://localhost:9090/api';

// Helper functions
// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    // browserHistory.push('/');
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// User function
export function loginUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/login`, { email, password }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

/*
  ================
    GROUPS
  ================
*/

export function createGroup(group) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/groups`, group, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'CREATE_GROUP',
        payload: response.data,
      });
      // browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}
