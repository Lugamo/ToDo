import { combineReducers } from 'redux';
import usersReducer from './users/usersReducers';
import tasksReducer from './tasks/tasksReducers';
import formReducer from './form/formReducer';

const rootReducers = combineReducers({
  tasks: tasksReducer,
  users: usersReducer,
  form: formReducer,
});

export default rootReducers;