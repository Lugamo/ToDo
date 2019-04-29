import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_SUCCESS_PUT, TASKS_FAILURE, TASKS_FILTER} from './tasksTypes';

function getDataTasks(endpoint) {
  return (dispatch) => {
    dispatch({ type: TASKS_REQUEST });
    
    const url = `http://localhost:3001${endpoint}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => res.json())
      .then((response) => {
        dispatch({
          type: TASKS_SUCCESS,
          payload: {
            tasks: response.tasks,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: TASKS_FAILURE,
          payload: {},
          error: error.message.toString(),
        });
      });
  };
}

function setFilter(filterValue) {
  return (dispatch) => {
    dispatch({
      type: TASKS_FILTER,
      payload: {
        filter: filterValue,
      },
    });
  }
}

function putDataTasks(endpoint, body) {
  return (dispatch) => {
    dispatch({ type: TASKS_REQUEST });
    
    const url = `http://localhost:3001${endpoint}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then((response) => {
        console.log(response.status);
        dispatch({
          type: TASKS_SUCCESS_PUT,
          payload: {
            task: response,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: TASKS_FAILURE,
          payload: {},
          error: error.message.toString(),
        });
      });
  };
}

export {
  getDataTasks,
  setFilter,
  putDataTasks,
}