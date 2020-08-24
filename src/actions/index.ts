import { AxiosInstance } from "axios";

export enum types {
  SET_NETWORK_LOADING = "SET_NETWORK_LOADING",
  SET_USER_LOGIN = "SET_USER_LOGIN",
  SET_USER_LOGOUT = "SET_USER_LOGOUT",
  SET_USER_TOKEN = "SET_USER_TOKEN",
  SET_ISSUES = "SET_ISSUES",
  SET_NETWORK_ERROR = "SET_NETWORK_ERROR",
}

export type iAction = {
  type: types;
  payload: any;
};

function returnAction(type: types, payload: any, dispatch?: Function) {
  const toReturn = {
    type,
    payload,
  };
  if (dispatch) {
    dispatch(toReturn);
  } else {
    return toReturn;
  }
}

export const logUserIn = (token: string) => (dispatch: Function) => {
  returnAction(types.SET_USER_TOKEN, token, dispatch);
};

export const logUserOut = () => (dispatch: Function) => {
  returnAction(types.SET_USER_LOGOUT, null, dispatch);
  returnAction(types.SET_NETWORK_ERROR, "", dispatch);
};

export const getIssues = (axios: AxiosInstance) => (dispatch: Function) => {
  returnAction(types.SET_NETWORK_LOADING, true, dispatch);
  axios
    .get("/api/devdesk/questions")
    .then((res) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(types.SET_NETWORK_ERROR, "", dispatch);
      returnAction(types.SET_ISSUES, res.data, dispatch);
    })
    .catch((err) => {
      returnAction(types.SET_NETWORK_LOADING, false, dispatch);
      returnAction(
        types.SET_NETWORK_ERROR,
        err.response || err.message,
        dispatch
      );
    });
};
