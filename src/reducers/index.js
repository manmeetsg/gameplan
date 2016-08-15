import { combineReducers } from 'redux';

import GroupsReducer from './groups-reducer';
import AuthReducer from './auth-reducer';

const rootReducer = combineReducers({
  groups: GroupsReducer,
  auth: AuthReducer,
});

export default rootReducer;
