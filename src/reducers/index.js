import { combineReducers } from 'redux';

import GroupsReducer from './groups-reducer';
import AuthReducer from './auth-reducer';
import PostReducer from './post-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  groups: GroupsReducer,
  auth: AuthReducer,
  posts: PostReducer,
  users: UserReducer,
});

export default rootReducer;
