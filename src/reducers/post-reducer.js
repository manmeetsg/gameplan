import { ActionTypes } from '../actions';

const PostReducer = (state = { all: [], currentPost: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return { all: state.all, currentPost: action.payload };
    case ActionTypes.FETCH_POSTS:
      return { all: action.payload, currentPost: state.currentPost };
    default:
      return state;
  }
};

export default PostReducer;
