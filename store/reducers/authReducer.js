import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_START,
  USER_DATA_SUCCESS,
  LOGOUT,
} from "../actions/types";

let initial_state = {
  data: {
    user: null,
  },
  isLoading: false,
  error: false,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        data: {
          user: null,
        },
        error: false,
      };
    default:
      return state;
  }
};