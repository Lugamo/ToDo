import { USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE} from './usersTypes';

function getDataUsers(endpoint) {
  return (dispatch) => {
    dispatch({ type: USERS_REQUEST });
    
    const url = `http://localhost:3001${endpoint}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => res.json())
      .then((response) => {
        dispatch({
          type: USERS_SUCCESS,
          payload: {
            users: response.users,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: USERS_FAILURE,
          payload: {},
          error: error.message.toString(),
        });
      });
  };
}

export {
  getDataUsers,
}