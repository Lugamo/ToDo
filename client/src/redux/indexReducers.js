import { combineReducers } from 'redux';
import usersReducer from './users/usersReducers';
import tasksReducer from './tasks/tasksReducers';

const rootReducers = combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
});

export default rootReducers;