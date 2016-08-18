import { ActionTypes } from '../actions';

const UserReducer = (state = { all: [], me: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return { all: action.payload, me: state.me };
    case ActionTypes.FETCH_ME:
      return { all: state.all, me: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
