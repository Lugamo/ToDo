import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_SUCCESS_PUT, TASKS_FAILURE, TASKS_FILTER, TASKS_SUCCESS_POST } from './tasksTypes';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: '',
  showForm: false,
};

export default (state = initialState, action) => {
  const { tasks } = state;
  switch (action.type) {
    case TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.tasks,
        error: null,
      };
    case TASKS_SUCCESS_PUT:
      const id = action.payload.task.id;
      const index = tasks.map((e) => { return e.id; }).indexOf(id);
      
      tasks[index] = {
        id: action.payload.task.id,
        title: action.payload.task.title,
        description: action.payload.task.description,
        assignedTo: action.payload.task.assignedTo,
        status: action.payload.task.status
      }

      return {
        ...state,
        loading: false,
        tasks: tasks,
        error: null,
      };
      case TASKS_SUCCESS_POST:
      tasks.push(action.payload.task);
      return {
        ...state,
        loading: false,
        tasks: tasks,
        error: null,
      };
    case TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case TASKS_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
    default:
      return state;
  }
};