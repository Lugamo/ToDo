import { USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE } from './usersTypes';

const initialState = {
  users: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        error: null,
      };
    case USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};