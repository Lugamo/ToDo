import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_SUCCESS_PUT, TASKS_FAILURE, TASKS_FILTER } from './tasksTypes';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: '',
  showForm: false,
};

export default (state = initialState, action) => {
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
      const { tasks } = state;
      const id = action.payload.task.id;
      const newStatus = action.payload.task.status;
      const index = tasks.map((e) => { return e.id; }).indexOf(id);

      tasks[index] = {
        id: tasks[index].id,
        title: tasks[index].title,
        description: tasks[index].description,
        assignedTo: tasks[index].assignedTo,
        status: newStatus
      }

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