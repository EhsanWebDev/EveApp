import {
  LOGIN_USER_START,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  USER_DATA_SUCCESS,
  LOGOUT,
} from "./types";

//===========Actions for user/admin login==========//
export function loading() {
  return function (dispatch) {
    dispatch({ type: LOGIN_USER_START });
  };
}
export function loginUserSuccess(data) {
  return (dispatch) => {
    //
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  };
}
export function loginUserFail(data) {
  return function (dispatch) {
    dispatch({ type: LOGIN_USER_FAILURE, payload: data });
  };
}
export function loginUserData(data) {
  return function (dispatch) {
    dispatch({ type: USER_DATA_SUCCESS, payload: data });
  };
}

export function logout() {
  return {
    type: "logout",
  };
}
