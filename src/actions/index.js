import axios from 'axios';
import http from 'http';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  FETCH_GROUPS: 'FETCH_GROUPS',
  FETCH_GROUP: 'FETCH_GROUP',

  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',

  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',

  FETCH_USERS: 'FETCH_USERS',
  FETCH_ME: 'FETCH_ME',
};

// const ROOT_URL = 'http://gameplan-backend.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';

// Helper functions
// deletes token from localstorage
// and deauths
export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');

    // Try and logout with CAS
    http.get('http://login.dartmouth.edu/cas/logout', res => {
      // Success
    }).on('error', e => {
      // Error
    });
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
export function loginUser({ ticket }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/login`, { ticket }).then(response => {
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
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}

export function updateGroup(id, group) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/groups/${id}`, group, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_GROUP',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchGroups() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/groups`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_GROUPS',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchGroup(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/groups/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_GROUP',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

/*
  ================
    POSTS
  ================
*/
export function createPost(post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_POSTS',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchPostsForGroup(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/group/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_POSTS',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_POST',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_POST',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function postComment(id, message) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts/${id}`, message, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_POST',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

/*
  ================
    USERS
  ================
*/
export function fetchUsers() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_USERS',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function getMe() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/me`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({
        type: 'FETCH_ME',
        payload: response.data,
      });
    }).catch(error => {
      console.log(error);
    });
  };
}
